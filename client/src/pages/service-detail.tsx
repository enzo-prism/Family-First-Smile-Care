import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { CheckCircle, ArrowLeft, Stethoscope, Baby, Sparkles, Smile, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/data/services";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = params.serviceId;
  
  // Find the service by ID (check both main services and sub-services)
  const service = services.find(s => s.id === serviceId) || 
    services.flatMap(s => s.subServices || []).find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-16 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/services">
            <Button className="bg-primary text-white hover:bg-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      tooth: <Stethoscope className="w-8 h-8" />,
      child: <Baby className="w-8 h-8" />,
      sparkles: <Sparkles className="w-8 h-8" />,
      smile: <Smile className="w-8 h-8" />,
      activity: <Activity className="w-8 h-8" />,
    };
    
    return iconMap[iconName] || <Stethoscope className="w-8 h-8" />;
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
    <div className="pt-16 pb-20 bg-white">
      <Helmet>
        <title>{service.title} - Family First Smile Care | Los Gatos</title>
        <meta name="description" content={`${service.heroDescription || service.description} Professional ${service.title.toLowerCase()} services in Los Gatos, CA by Dr. Tim J. Chuang.`} />
        <link rel="canonical" href={`https://famfirstsmile.com/services/${service.id}`} />
      </Helmet>
      
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className={`${getIconColor(service.icon)} text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              variants={scaleIn}
            >
              {getIconComponent(service.icon)}
            </motion.div>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              variants={fadeInUp}
            >
              {service.title}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {service.heroDescription || service.description}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Back Button */}
        <motion.div 
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/services">
            <Button variant="ghost" className="text-primary hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Services
            </Button>
          </Link>
        </motion.div>

        {/* Service Overview */}
        <motion.div 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About {service.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.longDescription || `Learn more about our comprehensive ${service.title.toLowerCase()} services designed to meet your oral health needs with the highest standards of care and professionalism.`}
              </p>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8"
              variants={scaleIn}
            >
              <div className={`${getIconColor(service.icon)} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">What's Included</h3>
              <ul className="space-y-3 text-gray-600">
                {service.details.map((detail: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        {service.benefits && (
          <motion.div 
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits of {service.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how {service.title.toLowerCase()} can improve your oral health and overall well-being.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {service.benefits.map((benefit: string, index: number) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Process Section */}
        {service.process && (
          <motion.div 
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Here's what you can expect during your {service.title.toLowerCase()} treatment.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {service.process.map((step: string, index: number) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center"
                  variants={scaleIn}
                >
                  <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-center text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Schedule your consultation today and take the first step towards better oral health with our {service.title.toLowerCase()} services.
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
        </motion.div>
      </div>
    </div>
  );
}