// Define the gtag and hotjar functions globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    hj: (...args: any[]) => void;
    _hjSettings: {
      hjid: number;
      hjsv: number;
    };
  }
}

const GOOGLE_ADS_TAG_ID = "G-36WRRLZB2B";

const getGtagMeasurementIds = () => {
  const ids = [
    import.meta.env.VITE_GA_MEASUREMENT_ID?.trim(),
    GOOGLE_ADS_TAG_ID,
  ].filter((id): id is string => Boolean(id));

  return Array.from(new Set(ids));
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined") {
    return;
  }

  const measurementIds = getGtagMeasurementIds();
  if (!measurementIds.length) {
    console.warn("No Google Analytics or Ads measurement IDs found for gtag.");
    return;
  }

  const loaderId = measurementIds[0];
  const existingLoader = document.querySelector<HTMLScriptElement>('script[data-gtag-loader="true"]');
  if (!existingLoader) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${loaderId}`;
    script.setAttribute("data-gtag-loader", "true");
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };
  }

  window.gtag("js", new Date());
  measurementIds.forEach((id) => {
    window.gtag("config", id);
  });
};

// Initialize Hotjar
export const initHotjar = () => {
  // Hotjar Tracking Code for Family First Smile Care
  const script = document.createElement('script');
  script.textContent = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6487571,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;
  document.head.appendChild(script);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  const measurementIds = getGtagMeasurementIds();
  if (!measurementIds.length) return;

  measurementIds.forEach((id) => {
    window.gtag('config', id, {
      page_path: url
    });
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
