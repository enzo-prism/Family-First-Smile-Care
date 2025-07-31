import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Smile, CreditCard, Star } from "lucide-react";
import familyFirstLogo from "@assets/Logo_1753972444614.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Team", href: "/team" },
  { name: "Patient Info", href: "/patient-info" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src={familyFirstLogo} 
              alt="Family First Smile Care Logo" 
              className="h-10 w-10 mr-3"
            />
            <span className="text-xl font-bold text-gray-800">Family First Smile Care</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${
                  location === item.href
                    ? "text-primary font-semibold"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="https://swipesimple.com/links/lnk_67505de480da165de07d5bd3f42fbcce" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mr-4"
            >
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Bill
              </Button>
            </a>
            <Link href="/contact">
              <Button className="bg-primary text-white hover:bg-blue-700">
                Book Appointment
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`nav-link text-lg ${
                        location === item.href
                          ? "text-primary font-semibold"
                          : "text-gray-700 hover:text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <a 
                    href="https://swipesimple.com/links/lnk_67505de480da165de07d5bd3f42fbcce" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="w-fit"
                  >
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Bill Online
                    </Button>
                  </a>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="bg-primary text-white hover:bg-blue-700 w-fit">
                      Book Appointment
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
