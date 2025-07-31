import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function Services() {
  return (
    <div className="pt-16 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Helmet>
        <title>Dental Services - Family First Smile Care | Los Gatos</title>
        <meta name="description" content="Comprehensive dental services including children's dentistry, dental exams, hygiene, general & family care, night guards, restorative dentistry, Invisalign, teeth whitening, dental crowns, and TMJ treatment in Los Gatos, CA." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/5 to-primary/10"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              variants={fadeInUp}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Comprehensive
              </span>{" "}
              Services
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              From routine cleanings to advanced treatments, we offer complete dental care for your entire family with state-of-the-art technology and compassionate care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <ServiceCard 
                service={service} 
                featured={service.featured || (service.subServices && service.subServices.some(sub => sub.featured))}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.section 
        className="relative py-16 lg:py-24 mx-4 sm:mx-6 lg:mx-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-center text-white shadow-2xl">
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Ready to Start Your Dental Journey?
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Schedule your consultation today and discover how our comprehensive dental services can transform your smile and oral health.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <a 
                href="https://fxuqp40sseh.typeform.com/to/CiLYdxSU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button
                  className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl text-lg shadow-lg w-full sm:w-auto transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Your Appointment
                </motion.button>
              </a>
              <span className="text-white/80 text-sm">or call (408) 358-8100</span>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
