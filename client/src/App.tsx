import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "./hooks/use-analytics";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SeoMeta from "@/components/seo/canonical";
import { MotionConfig } from "framer-motion";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Services = lazy(() => import("@/pages/services"));
const Team = lazy(() => import("@/pages/team"));
const PatientInfo = lazy(() => import("@/pages/patient-info"));
const PatientInfoBrushing = lazy(() => import("@/pages/patient-info-brushing"));
const PatientInfoFlossing = lazy(() => import("@/pages/patient-info-flossing"));
const PatientInfoNutrition = lazy(() => import("@/pages/patient-info-nutrition"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const SiteMap = lazy(() => import("@/pages/sitemap"));
const Contact = lazy(() => import("@/pages/contact"));
const TMJ = lazy(() => import("@/pages/tmj"));
const BabysFirstVisit = lazy(() => import("@/pages/babys-first-visit"));
const Invisalign = lazy(() => import("@/pages/invisalign"));
const IteroDigitalScanner = lazy(() => import("@/pages/itero-digital-scanner"));
const ServiceDetail = lazy(() => import("@/pages/service-detail"));
const FontTest = lazy(() => import("@/pages/font-test"));
const Admin = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <>
      <SeoMeta />
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/services/childrens-dentistry/babys-first-visit" component={BabysFirstVisit} />
          <Route path="/services/invisalign" component={Invisalign} />
          <Route path="/services/:serviceId" component={ServiceDetail} />
          <Route path="/technology/itero-digital-scanner" component={IteroDigitalScanner} />
          <Route path="/team" component={Team} />
          <Route path="/patient-info/brushing" component={PatientInfoBrushing} />
          <Route path="/patient-info/flossing" component={PatientInfoFlossing} />
          <Route path="/patient-info/nutrition" component={PatientInfoNutrition} />
          <Route path="/patient-info" component={PatientInfo} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/blog" component={Blog} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/sitemap" component={SiteMap} />
          <Route path="/contact" component={Contact} />
          <Route path="/tmj" component={TMJ} />
          <Route path="/font-test" component={FontTest} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MotionConfig reducedMotion="user">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[60] rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              Skip to content
            </a>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </MotionConfig>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
