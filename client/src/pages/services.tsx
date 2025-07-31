import { Helmet } from "react-helmet-async";
import ServiceCard from "@/components/service-card";
import type { Service } from "@/lib/types";

const services: Service[] = [
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
    id: "dental-exams",
    title: "Dental Exams",
    description: "Comprehensive oral health evaluations",
    icon: "tooth",
    details: [
      "Thorough oral health examinations",
      "Digital X-rays and imaging",
      "Early detection of dental issues",
      "Personalized treatment planning",
      "Regular check-up recommendations"
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
    id: "family-dentistry",
    title: "General & Family Dentistry",
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
    id: "night-guards",
    title: "Night Guards",
    description: "Protection against teeth grinding",
    icon: "tooth",
    details: [
      "Custom-fitted night guards",
      "Protection against bruxism",
      "Comfortable, durable materials",
      "Reduced jaw tension and pain",
      "Prevents tooth wear and damage"
    ]
  },
  {
    id: "restorative-dentistry",
    title: "Restorative Dentistry",
    description: "Restore damaged teeth to full function",
    icon: "tooth",
    details: [
      "Composite fillings",
      "Dental bonding",
      "Root canal therapy",
      "Complete smile restoration",
      "Long-lasting, natural-looking results"
    ],
    subServices: [
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
      },
      {
        id: "teeth-whitening",
        title: "Teeth Whitening",
        description: "Professional whitening for brighter smiles",
        icon: "sparkles",
        details: [
          "Professional-grade whitening treatments",
          "Safe and effective bleaching agents",
          "Dramatic results in just one visit",
          "Custom take-home whitening kits",
          "Long-lasting, natural-looking brightness"
        ]
      },
      {
        id: "dental-crowns",
        title: "Dental Crowns",
        description: "Restore and protect damaged teeth",
        icon: "tooth",
        details: [
          "Custom-fitted porcelain crowns",
          "Natural-looking tooth restoration",
          "Strong, durable materials",
          "Same-day crown options available",
          "Complete protection for damaged teeth"
        ]
      }
    ]
  },
  {
    id: "tmj",
    title: "TMJ Treatment",
    description: "Relief for jaw pain and dysfunction",
    icon: "activity",
    details: [
      "Comprehensive TMJ/TMD evaluation and diagnosis",
      "Custom night guards to prevent teeth grinding",
      "Physical therapy and jaw exercises",
      "Advanced CBCT imaging for precise assessment",
      "Personalized treatment plans for lasting relief"
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-16 pb-20 bg-gray-50">
      <Helmet>
        <title>Dental Services - Family First Smile Care | Los Gatos</title>
        <meta name="description" content="Comprehensive dental services including children's dentistry, dental exams, hygiene, general & family care, night guards, restorative dentistry, Invisalign, teeth whitening, dental crowns, and TMJ treatment in Los Gatos, CA." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Comprehensive Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From routine cleanings to advanced treatments, we offer complete dental care for your entire family</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              featured={service.featured || (service.subServices && service.subServices.some(sub => sub.featured))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
