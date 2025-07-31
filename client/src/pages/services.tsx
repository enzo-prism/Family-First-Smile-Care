import { Helmet } from "react-helmet-async";
import ServiceCard from "@/components/service-card";
import type { Service } from "@/lib/types";

const services: Service[] = [
  {
    id: "family-dentistry",
    title: "Family Dentistry",
    description: "Comprehensive care for all ages",
    icon: "tooth",
    details: [
      "Routine dental examinations",
      "Professional dental cleanings", 
      "Preventive care and education",
      "Digital X-rays and diagnostics",
      "Fluoride treatments"
    ]
  },
  {
    id: "children-dentistry",
    title: "Children's Dentistry",
    description: "Gentle care for little smiles",
    icon: "child",
    details: [
      "Gentle first visits and dental exams",
      "Habit-building and oral hygiene education",
      "Child-friendly tools and techniques",
      "Rewards program with toys and stickers",
      "Preventive sealants and fluoride"
    ]
  },
  {
    id: "dental-hygiene", 
    title: "Dental Hygiene",
    description: "Professional cleanings and education",
    icon: "sparkles",
    details: [
      "Professional dental cleanings",
      "Plaque and tartar removal",
      "Gum health assessment",
      "Personalized oral hygiene education",
      "Home care recommendations"
    ]
  },
  {
    id: "invisalign",
    title: "Invisalign",
    description: "Clear aligners for a perfect smile",
    icon: "smile",
    featured: true,
    details: [
      "Virtually invisible clear aligners",
      "Removable for eating and cleaning",
      "Comfortable, smooth plastic material",
      "Shorter treatment time than traditional braces",
      "Free initial consultation and 3D preview"
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-16 pb-20 bg-gray-50">
      <Helmet>
        <title>Dental Services - Family First Smile Care | Los Gatos</title>
        <meta name="description" content="Comprehensive dental services including family dentistry, children's care, cleanings, and Invisalign. Quality dental care for all ages in Los Gatos, CA." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Comprehensive Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">From routine cleanings to advanced treatments, we offer complete dental care for your entire family</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              featured={service.featured}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
