import { useState, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, CreditCard, Menu } from "lucide-react";
import familyFirstLogo from "@assets/Logo_1753972987510.png";
import { services } from "@/data/services";
import { APPOINTMENT_FORM_URL, triggerGoogleAdsConversion } from "@/lib/analytics";

const navigation: Array<{ name: string; href: string; dropdown?: boolean }> = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services", dropdown: true },
  { name: "Our Team", href: "/team" },
  { name: "Patient Info", href: "/patient-info" },
  { name: "Contact", href: "/contact" },
];

const getServiceHref = (serviceId: string) =>
  serviceId === "tmj" ? "/tmj" : `/services/${serviceId}`;

const serviceMenuGroups = services.map((service) => ({
  title: service.title,
  href: getServiceHref(service.id),
  children: service.subServices?.map((subService) => ({
    title: subService.title,
    href: getServiceHref(subService.id),
  })),
}));

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handleAppointmentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerGoogleAdsConversion(APPOINTMENT_FORM_URL, "_blank");
  };
  const isServicesActive =
    location === "/services" ||
    location.startsWith("/services/") ||
    location === "/tmj";
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
              onError={(e) => {
                console.error('ES module logo failed, trying fallback path:', familyFirstLogo);
                e.currentTarget.src = '/attached_assets/Logo_1753972987510.png';
                e.currentTarget.onerror = () => {
                  console.error('All logo paths failed');
                  e.currentTarget.style.display = 'none';
                };
              }}
            />
            <span className="text-xl font-bold text-gray-800">Family First Smile Care</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`nav-link inline-flex items-center gap-1 ${
                        isServicesActive
                          ? "text-primary font-semibold"
                          : "text-gray-700 hover:text-primary"
                      } data-[state=open]:text-primary`}
                    >
                      Services
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 p-3">
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-md bg-primary/5 px-3 py-2 font-semibold text-primary focus:bg-primary/10 focus:text-primary"
                    >
                      <Link href="/services">View all services</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <div className="space-y-3">
                      {serviceMenuGroups.map((service) => (
                        <div key={service.href} className="space-y-1">
                          <DropdownMenuItem
                            asChild
                            className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-gray-900 focus:bg-primary/10 focus:text-primary"
                          >
                            <Link href={service.href}>{service.title}</Link>
                          </DropdownMenuItem>
                          {service.children?.length ? (
                            <div className="space-y-1 pl-4">
                              {service.children.map((child) => (
                                <DropdownMenuItem
                                  key={child.href}
                                  asChild
                                  className="cursor-pointer rounded-md px-3 py-2 text-sm text-gray-600 focus:bg-primary/10 focus:text-primary"
                                >
                                  <Link href={child.href}>{child.title}</Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
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
              )
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
            <a 
              href={APPOINTMENT_FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleAppointmentClick}
            >
              <Button className="bg-primary text-white hover:bg-blue-700">
                Book Appointment
              </Button>
            </a>
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
                  {navigation.filter((item) => !item.dropdown).map((item) => (
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
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Services</p>
                    <div className="mt-3 flex flex-col space-y-4">
                      <Link
                        href="/services"
                        className="text-gray-800 font-semibold hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        View all services
                      </Link>
                      {serviceMenuGroups.map((service) => (
                        <div key={service.href} className="space-y-2">
                          <Link
                            href={service.href}
                            className="text-gray-800 font-semibold hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {service.title}
                          </Link>
                          {service.children?.length ? (
                            <div className="space-y-2 pl-4">
                              {service.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="text-sm text-gray-600 hover:text-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
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
