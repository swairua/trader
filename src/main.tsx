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
        // Prevent the error from being treated as uncaught to avoid noisy logs
        evt.preventDefault();
        return;
      }
    } catch (e) {
      // swallow
    }
  });

  window.addEventListener('unhandledrejection', (evt: PromiseRejectionEvent) => {
    try {
      const reason = (evt && (evt as any).reason) || {};
      const msg = reason && reason.message ? reason.message : String(reason);
      if (typeof msg === 'string' && msg.includes('Failed to fetch')) {
        evt.preventDefault();
        return;
      }
    } catch (e) {
      // swallow
    }
  });
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
