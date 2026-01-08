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

const GOOGLE_ADS_TAG_ID = "AW-11373090310"; // Google Ads conversion tracking ID
const GOOGLE_ADS_CONVERSION_EVENT = "ads_conversion_Submit_lead_form_1";
const DEFAULT_GA_MEASUREMENT_ID = "G-L7MH47XYXL";
const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;
export const APPOINTMENT_FORM_URL = "https://fxuqp40sseh.typeform.com/to/CiLYdxSU";

let gtagInitialized = false;
let gtagScriptInjected = false;

const ensureGtag = () => {
  if (typeof window === "undefined") {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };
  }

  return true;
};

const injectGtagScript = (loaderId: string) => {
  if (gtagScriptInjected) {
    return;
  }

  const existingLoader = document.querySelector<HTMLScriptElement>("script[data-gtag-loader=\"true\"]");
  if (existingLoader) {
    gtagScriptInjected = true;
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`;
  script.setAttribute("data-gtag-loader", "true");
  document.head.appendChild(script);
  gtagScriptInjected = true;
};

const openUrl = (url: string, target: "_self" | "_blank") => {
  if (!url) return;

  if (target === "_blank") {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
    return;
  }

  window.location.assign(url);
};

export const triggerGoogleAdsConversion = (url?: string, target: "_self" | "_blank" = "_self") => {
  if (typeof window === "undefined") return;

  initGA();

  const navigate = () => {
    if (!url) return;
    openUrl(url, target);
  };

  if (!window.gtag) {
    navigate();
    return;
  }

  let callbackInvoked = false;
  const callback = () => {
    if (callbackInvoked) return;
    callbackInvoked = true;
    navigate();
  };

  window.gtag("event", GOOGLE_ADS_CONVERSION_EVENT, {
    event_callback: callback,
    event_timeout: 2000,
  });

  window.setTimeout(callback, 2100);
};

// Initialize Google Analytics
export const initGA = () => {
  if (gtagInitialized) return;
  if (!ensureGtag()) return;

  injectGtagScript(GA_MEASUREMENT_ID);
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  window.gtag("config", GOOGLE_ADS_TAG_ID);
  gtagInitialized = true;
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
  if (typeof window === "undefined") return;

  initGA();
  if (!window.gtag) return;

  const pagePath = url || `${window.location.pathname}${window.location.search}`;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === "undefined") return;

  initGA();
  if (!window.gtag) return;
  
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
