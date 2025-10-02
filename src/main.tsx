import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { I18nProvider } from '@/i18n';
import { QueryProvider } from './providers/QueryProvider';
import './index.css';
import { preloadCriticalResources, enableServiceWorker } from './utils/performanceOptimization';
import { initializeConversionTracking } from './utils/enhancedConversionTracking';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

// Suppress noisy "Failed to fetch" errors from third-party scripts (FullStory, vite client ping, etc.)
if (typeof window !== 'undefined') {
  const handleDynamicImportFailure = async (reasonMsg?: string) => {
    try {
      // Unregister any service workers and clear caches, then reload to fetch fresh bundles
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch (e) {
      console.warn('Failed to clean service worker/caches', e);
    } finally {
      // Force reload to pick up latest assets from the network
      try { window.location.reload(); } catch (e) { /* ignore */ }
    }
  };

  window.addEventListener('error', (evt: ErrorEvent) => {
    try {
      const message = (evt && (evt as any).message) || '';
      if (typeof message === 'string') {
        if (message.includes('Failed to fetch dynamically imported module') || message.includes('Failed to fetch')) {
          evt.preventDefault();
          // If a dynamically imported module failed, attempt to recover by clearing SW & caches
          if (message.includes('Failed to fetch dynamically imported module')) {
            handleDynamicImportFailure(message);
            return;
          }
          return;
        }
      }
    } catch (e) {}
  });

  window.addEventListener('unhandledrejection', (evt: PromiseRejectionEvent) => {
    try {
      const reason = (evt && (evt as any).reason) || {};
      const msg = reason && reason.message ? reason.message : String(reason);
      if (typeof msg === 'string') {
        if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Failed to fetch')) {
          evt.preventDefault();
          if (msg.includes('Failed to fetch dynamically imported module')) {
            handleDynamicImportFailure(msg);
            return;
          }
          return;
        }
      }
    } catch (e) {}
  });

  // Intercept noisy third-party fetch failures and stabilize Vite HMR ping in dev
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let urlStr = '';
    try {
      if (typeof input === 'string') urlStr = input;
      else if (input instanceof Request) urlStr = input.url;
      else if (input instanceof URL) urlStr = input.toString();
      else urlStr = String(input);
    } catch (e) {
      urlStr = '';
    }

    // Short-circuit Vite pings and HMR client requests to avoid noisy errors in constrained envs
    const isVitePing = urlStr.includes('/__vite_ping');
    const isViteClient = urlStr.includes('/@vite/') || urlStr.includes('/@react-refresh') || urlStr.includes('@vite/client');
    const isHmrAsset = urlStr.includes('hot-update') || urlStr.includes('__open-in-editor');

    if (isVitePing) {
      return new Response('pong', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    if (import.meta.env.DEV && (isViteClient || isHmrAsset)) {
      try {
        return await originalFetch(input as any, init);
      } catch {
        return new Response(null, { status: 204 });
      }
    }

    // If not in DEV but request looks like Vite client asset, short-circuit to avoid thrown errors
    if (!import.meta.env.DEV && (isViteClient || isHmrAsset)) {
      return new Response(null, { status: 204 });
    }

    // Parse hostname/path safely to decide whether to short-circuit third-party analytics
    let host = '';
    let path = '';
    try {
      const u = new URL(urlStr, typeof location !== 'undefined' ? location.origin : 'http://localhost');
      host = u.hostname || '';
      path = u.pathname || '';
    } catch (e) {
      host = '';
      path = urlStr || '';
    }

    const thirdPartyHostPattern = /fullstory|edge\.fullstory\.com|sentry|segment|hotjar|heap|libretranslate|translate\.argosopentech\.com/;
    const thirdPartyPathPattern = /\/s\/fs\.js|fs\.js|\/cdn-cgi\/|collect|analytics|telemetry|\/translate/;
    const hmrPattern = /@vite|hot-update|__open-in-editor/;

    // If this looks like a third-party analytics/HMR or translation request, avoid attempting network fetch in constrained envs
    if (thirdPartyHostPattern.test(host) || thirdPartyPathPattern.test(path) || hmrPattern.test(urlStr)) {
      try {
        // Try the real fetch but silently swallow failures
        return await originalFetch(input as any, init);
      } catch {
        return new Response(null, { status: 204 });
      }
    }

    try {
      return await originalFetch(input as any, init);
    } catch (err: any) {
      const msg = err && (err.message || String(err)) || '';

      // Parse hostname/path safely to decide whether to silence
      let h = host;
      let p = path;
      try {
        const u = new URL(urlStr, typeof location !== 'undefined' ? location.origin : 'http://localhost');
        h = u.hostname || h;
        p = u.pathname || p;
      } catch (e) {
        // keep existing
      }

      // Silence fetch noise from analytics SDKs (e.g., FullStory), translation endpoints and HMR-related assets
      const lowerMsg = typeof msg === 'string' ? msg.toLowerCase() : '';
      const isNetworkError = err instanceof TypeError || lowerMsg.includes('failed to fetch') || lowerMsg.includes('networkerror') || lowerMsg.includes('network error') || lowerMsg.includes('fetch failed');

      if (isNetworkError && (thirdPartyHostPattern.test(h) || thirdPartyPathPattern.test(p) || hmrPattern.test(urlStr))) {
        return new Response(null, { status: 204 });
      }

      // For other network errors, rethrow so application logic can handle them
      throw err;
    }
  };
}

// Initialize performance optimizations
preloadCriticalResources();
if (import.meta.env.PROD) {
  enableServiceWorker();
} else if ('serviceWorker' in navigator) {
  // Ensure no stale SW/caches in dev causing old bundles
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }
}

// Initialize Web Vitals measurement
if (typeof window !== 'undefined') {
  import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
    onCLS(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  });
}

// Initialize conversion tracking
initializeConversionTracking({
  googleAdsId: 'AW-123456789', // Replace with actual Google Ads ID
  ga4Id: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
  gtmId: 'GTM-XXXXXXX', // Replace with actual GTM ID
  facebookPixelId: '123456789012345', // Replace with actual Facebook Pixel ID
  debug: false
});

createRoot(rootElement).render(
  <StrictMode>
    <QueryProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </QueryProvider>
  </StrictMode>
);
