import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initGA, initHotjar } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SeoMeta from "@/components/seo/canonical";
import LocalBusinessSchema from "@/components/seo/local-business-schema";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Team from "@/pages/team";
import PatientInfo from "@/pages/patient-info";
import PatientInfoBrushing from "@/pages/patient-info-brushing";
import PatientInfoFlossing from "@/pages/patient-info-flossing";
import PatientInfoNutrition from "@/pages/patient-info-nutrition";
import Contact from "@/pages/contact";
import TMJ from "@/pages/tmj";
import BabysFirstVisit from "@/pages/babys-first-visit";
import Invisalign from "@/pages/invisalign";
import IteroDigitalScanner from "@/pages/itero-digital-scanner";
import ServiceDetail from "@/pages/service-detail";
import FontTest from "@/pages/font-test";
import NotFound from "@/pages/not-found";

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
      <LocalBusinessSchema />
      <ScrollToTop />
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
        <Route path="/contact" component={Contact} />
        <Route path="/tmj" component={TMJ} />
        <Route path="/font-test" component={FontTest} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  // Initialize analytics when app loads
  useEffect(() => {
    // Initialize Google Analytics
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    }

    initGA();
    
    // Initialize Hotjar
    initHotjar();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
