import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Stethoscope, Baby, Sparkles, Smile, Activity } from "lucide-react";
import { Link } from "wouter";
import type { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export default function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      tooth: <Stethoscope className="w-6 h-6" />,
      child: <Baby className="w-6 h-6" />,
      sparkles: <Sparkles className="w-6 h-6" />,
      smile: <Smile className="w-6 h-6" />,
      activity: <Activity className="w-6 h-6" />,
    };
    
    return iconMap[iconName] || <Stethoscope className="w-6 h-6" />;
  };

  const getIconColor = (iconName: string) => {
    const colorMap: { [key: string]: string } = {
      tooth: "bg-primary",
      child: "bg-secondary", 
      sparkles: "bg-accent",
      smile: "bg-primary",
      activity: "bg-secondary",
    };
    
    return colorMap[iconName] || "bg-primary";
  };

  return (
    <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
      featured 
        ? "border-2 border-primary shadow-primary/10" 
        : "border-gray-100 hover:border-primary/30"
    }`}>
      {featured && (
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 text-center">
          <span className="font-bold text-sm tracking-wide">⭐ FREE CONSULTATION AVAILABLE ⭐</span>
        </div>
      )}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className={`${getIconColor(service.icon)} text-white w-16 h-16 rounded-2xl flex items-center justify-center sm:mr-6 shadow-lg flex-shrink-0 mx-auto sm:mx-0`}>
            {getIconComponent(service.icon)}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{service.title}</h2>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>
        </div>
        
        <div className="service-content">
          <div className="mb-4">
            <Button
              variant="ghost"
              className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-primary hover:bg-primary/5 p-3 rounded-xl transition-all duration-200"
              onClick={toggleExpanded}
            >
              <span className="text-base">Learn More</span>
              <ChevronDown className={`h-5 w-5 transform transition-all duration-300 ${isExpanded ? "rotate-180 text-primary" : "text-gray-400"}`} />
            </Button>
            
            {isExpanded && (
              <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-3">
                  {service.details.map((detail, index) => (
                    <div key={index} className="flex items-start text-gray-600 group">
                      <Check className="text-secondary mr-3 h-5 w-5 mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors duration-200" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
                
                {service.subServices && service.subServices.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-lg">Specialized Treatments:</h4>
                    <div className="grid gap-4 sm:gap-3">
                      {service.subServices.map((subService) => (
                        <div key={subService.id} className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-2xl p-4 border border-gray-100 hover:border-primary/20 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center mb-3">
                            <div className={`${getIconColor(subService.icon)} text-white w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-md`}>
                              {getIconComponent(subService.icon)}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-800 text-base">{subService.title}</h5>
                              <p className="text-sm text-gray-600 leading-relaxed">{subService.description}</p>
                            </div>
                          </div>
                          {subService.featured && (
                            <div className="mt-3">
                              <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                ⭐ FREE CONSULTATION AVAILABLE
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4 mt-6">
            {service.id === "tmj" && (
              <Link href="/tmj">
                <Button className="w-full bg-gradient-to-r from-secondary to-blue-600 text-white hover:from-blue-600 hover:to-secondary font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                  Learn More About TMJ Treatment
                </Button>
              </Link>
            )}
            
            {(featured || (service.subServices && service.subServices.some(sub => sub.featured))) && (
              <a 
                href="https://fxuqp40sseh.typeform.com/to/CiLYdxSU" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-primary font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                  Schedule Free Consultation
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
