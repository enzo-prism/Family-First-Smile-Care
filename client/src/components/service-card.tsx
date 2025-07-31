import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Stethoscope, Baby, Sparkles, Smile } from "lucide-react";
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
    };
    
    return iconMap[iconName] || <Stethoscope className="w-6 h-6" />;
  };

  const getIconColor = (iconName: string) => {
    const colorMap: { [key: string]: string } = {
      tooth: "bg-primary",
      child: "bg-secondary", 
      sparkles: "bg-accent",
      smile: "bg-primary",
    };
    
    return colorMap[iconName] || "bg-primary";
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${featured ? "border-2 border-primary" : ""}`}>
      {featured && (
        <div className="bg-primary text-white p-3 text-center">
          <span className="font-semibold">⭐ FREE CONSULTATION AVAILABLE ⭐</span>
        </div>
      )}
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className={`${getIconColor(service.icon)} text-white w-16 h-16 rounded-full flex items-center justify-center mr-4`}>
            {getIconComponent(service.icon)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
        
        <div className="service-content">
          <div className="mb-4">
            <Button
              variant="ghost"
              className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-primary p-0"
              onClick={toggleExpanded}
            >
              <span>Learn More</span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
            
            {isExpanded && (
              <div className="mt-4 space-y-2">
                {service.details.map((detail, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <Check className="text-secondary mr-3 h-4 w-4" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {featured && (
            <Button className="bg-primary text-white hover:bg-blue-700 font-semibold">
              Schedule Free Consultation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
