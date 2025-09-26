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
  window.addEventListener('error', (evt: ErrorEvent) => {
    try {
      const message = (evt && (evt as any).message) || '';
      if (typeof message === 'string' && message.includes('Failed to fetch')) {
        evt.preventDefault();
        return;
      }
    } catch (e) {}
  });

  window.addEventListener('unhandledrejection', (evt: PromiseRejectionEvent) => {
    try {
      const reason = (evt && (evt as any).reason) || {};
      const msg = reason && reason.message ? reason.message : String(reason);
      if (typeof msg === 'string' && msg.includes('Failed to fetch')) {
        evt.preventDefault();
        return;
      }
    } catch (e) {}
  });

  // Intercept noisy third-party fetch failures and stabilize Vite HMR ping in dev
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const urlStr = typeof input === 'string' ? input : (input as URL).toString();

    // Short-circuit Vite DEV pings/HMR fetches to avoid noisy errors in constrained envs
    if (import.meta.env.DEV) {
      const isVitePing = urlStr.includes('/__vite_ping');
      const isViteClient = urlStr.includes('/@vite/') || urlStr.includes('/@react-refresh') || urlStr.includes('@vite/client');
      const isHmrAsset = urlStr.includes('hot-update') || urlStr.includes('__open-in-editor');
      if (isVitePing) {
        return new Response('pong', { status: 200, headers: { 'Content-Type': 'text/plain' } });
      }
      if (isViteClient || isHmrAsset) {
        try {
          return await originalFetch(input as any, init);
        } catch {
          return new Response('', { status: 204 });
        }
      }
    }

    try {
      return await originalFetch(input as any, init);
    } catch (err: any) {
      const msg = err?.message || '';
      // Silence fetch noise from analytics SDKs (e.g., FullStory) without breaking app flow
      if (typeof msg === 'string' && msg.includes('Failed to fetch')) {
        if (/edge\.fullstory\.com|\/s\/fs\.js/.test(urlStr)) {
          return new Response('', { status: 204 });
        }
      }
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
