import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, Phone, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-16">
      <Helmet>
        <title>Page Not Found - Family First Smile Care</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage or contact us for assistance." />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Error Code */}
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          
          {/* Main Message */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find the page you're looking for. It may have been moved or no longer exists.
            Let's get you back on track!
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button className="bg-primary text-white hover:bg-blue-700 text-lg font-semibold px-6 py-3 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Back to Homepage
              </Button>
            </Link>
            
            <a href="tel:4083588100">
              <Button variant="outline" className="text-lg font-semibold px-6 py-3 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Us: (408) 358-8100
              </Button>
            </a>
          </div>
          
          {/* Helpful Links */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Helpful Links
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              <Link href="/services">
                <span className="text-primary hover:text-blue-700 font-medium cursor-pointer">
                  Our Services
                </span>
              </Link>
              <Link href="/about">
                <span className="text-primary hover:text-blue-700 font-medium cursor-pointer">
                  About Us
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-primary hover:text-blue-700 font-medium cursor-pointer">
                  Contact & Location
                </span>
              </Link>
            </div>
          </div>
          
          {/* Office Info */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-gray-700 font-medium">Family First Smile Care</span>
            </div>
            <p className="text-gray-600">
              15251 National Ave, Suite 102<br />
              Los Gatos, CA 95032
            </p>
            <p className="text-gray-600 mt-2">
              Monday - Thursday: 9:00 AM - 5:00 PM<br />
              Friday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}