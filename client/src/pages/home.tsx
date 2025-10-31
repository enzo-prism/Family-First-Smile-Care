import { Link } from "wouter";
import type { MouseEvent } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TestimonialCarousel from "@/components/testimonial-carousel";
import SocialMediaSection from "@/components/social-media";
import { Heart, Microscope, Users, Stethoscope, Baby, Sparkles, Smile, Star } from "lucide-react";
import { APPOINTMENT_FORM_URL, triggerGoogleAdsConversion } from "@/lib/analytics";

// Animation variants for reusable patterns
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const handleAppointmentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerGoogleAdsConversion(APPOINTMENT_FORM_URL, "_blank");
  };

  return (
    <div className="pt-16">
      <Helmet>
        <title>Family First Smile Care - Gentle Dental Care in Los Gatos, CA</title>
        <meta name="description" content="Gentle, compassionate dental care for the whole family in Los Gatos, CA. Dr. Tim J. Chuang offers comprehensive dental services in a welcoming environment." />
        <link rel="canonical" href="https://famfirstsmile.com/" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  style={{ display: 'block' }}
                >
                  Gentle, Compassionate Dental Care for the Whole Family
                </motion.span>
              </h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                variants={fadeInUp}
              >
                We provide exceptional dental care in a warm environment to foster healthy smiles for life.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <a 
                  href={APPOINTMENT_FORM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleAppointmentClick}
                >
                  <Button className="bg-primary text-white hover:bg-blue-700 text-lg font-semibold px-8 py-3 transform hover:scale-105 transition-transform duration-200">
                    Schedule Appointment
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-semibold px-8 py-3 transform hover:scale-105 transition-transform duration-200">
                    Our Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial="hidden"
              animate="visible"
              variants={slideInRight}
            >
              <motion.div 
                className="rounded-2xl shadow-xl w-full h-96 relative overflow-hidden"
                variants={scaleIn}
              >
                <iframe
                  src="https://player.vimeo.com/video/1106154947?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;background=1"
                  className="absolute inset-0 w-full h-full object-cover"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="Family First Smile Care Office Tour"
                ></iframe>
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <span className="text-accent mr-2">⭐</span>
                  <span className="font-semibold">5.0 Rating</span>
                </div>
                <p className="text-sm text-gray-600">From 40+ families</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
              variants={fadeInUp}
            >
              Why Choose Family First Smile Care?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              We're committed to providing exceptional dental care that puts your family's comfort and health first.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300 group"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="bg-primary text-white feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <Heart />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Compassionate Care</h3>
              <p className="text-gray-600">Gentle, patient-centered approach that puts your comfort first, especially for children and anxious patients.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-all duration-300 group"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="bg-secondary text-white feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <Microscope />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Advanced Technology</h3>
              <p className="text-gray-600">State-of-the-art equipment including digital X-rays and CBCT scanners for precise, efficient treatment.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-all duration-300 group"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="bg-accent text-white feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <Users />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Family-Focused</h3>
              <p className="text-gray-600">Comprehensive care for all ages, from your child's first visit to adult preventive and cosmetic dentistry.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
              variants={fadeInUp}
            >
              Our Featured Services
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              variants={fadeInUp}
            >
              Comprehensive dental care tailored to your family's unique needs
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="service-card p-6 group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Stethoscope className="text-primary text-3xl mb-4 group-hover:text-primary transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Family Dentistry</h3>
              <p className="text-gray-600 text-sm mb-4">Routine check-ups, cleanings, and preventive care for all ages.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0 group-hover:text-primary-dark transition-colors duration-200">Learn More</Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="service-card p-6 group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Baby className="text-secondary text-3xl mb-4 group-hover:text-secondary transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Children's Dentistry</h3>
              <p className="text-gray-600 text-sm mb-4">Gentle first visits and child-friendly approach with toys and stickers.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0 group-hover:text-primary-dark transition-colors duration-200">Learn More</Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="service-card p-6 group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Sparkles className="text-accent text-3xl mb-4 group-hover:text-accent transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Dental Hygiene</h3>
              <p className="text-gray-600 text-sm mb-4">Professional cleanings and education for maintaining strong smiles.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0 group-hover:text-primary-dark transition-colors duration-200">Learn More</Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="service-card p-6 group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Smile className="text-primary text-3xl mb-4 group-hover:text-primary transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Invisalign</h3>
              <p className="text-gray-600 text-sm mb-4">Clear aligners for straightening teeth with free consultations.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0 group-hover:text-primary-dark transition-colors duration-200">Learn More</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
              variants={fadeInUp}
            >
              What Our Patients Say
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              variants={fadeInUp}
            >
              Real stories from families who trust us with their smiles
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scaleIn}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* Office Tour Video Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
            >
              <motion.h2 
                className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6"
                variants={fadeInUp}
              >
                Take a Virtual Tour of Our Office
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                variants={fadeInUp}
              >
                Step inside our welcoming Los Gatos location and see why families choose us for their dental care. From our comfortable waiting area to our state-of-the-art treatment rooms.
              </motion.p>
              <motion.div variants={scaleIn}>
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-primary text-white hover:bg-blue-700 text-lg font-semibold px-8 py-3 transform transition-transform duration-200">
                      Learn More About Our Office
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              variants={slideInRight}
            >
              <motion.div 
                className="relative max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg"
                variants={scaleIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <iframe
                  className="w-full h-96 sm:h-[28rem] md:h-[32rem]"
                  src="https://player.vimeo.com/video/1106179834?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;background=1&amp;controls=0"
                  title="Family First Smile Care Virtual Office Tour"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  style={{ 
                    border: 'none', 
                    outline: 'none',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Google Review CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-orange-50 to-orange-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-center mb-4"
            variants={scaleIn}
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Star className="w-8 h-8 text-orange-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-4"
            variants={fadeInUp}
          >
            Love Your Experience?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={fadeInUp}
          >
            Help other families find us by sharing your experience on Google. Your review means the world to us!
          </motion.p>
          <motion.a 
            href="https://g.page/r/Cej0Xl18KcCyEAE/review" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-orange-500 text-white hover:bg-orange-600 text-lg font-semibold px-8 py-3 transform transition-transform">
              <Star className="h-5 w-5 mr-2" />
              Leave a Google Review
            </Button>
          </motion.a>
        </div>
      </motion.section>

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Call to Action Section */}
      <motion.section 
        className="py-20 gradient-primary text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            Ready for Your Best Smile?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            variants={fadeInUp}
          >
            Schedule your free Invisalign consultation today and take the first step towards a healthier, more confident smile.
          </motion.p>
          <motion.div variants={scaleIn}>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg font-semibold px-8 py-3 transform transition-transform">
                  Schedule Free Consultation
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
