import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Stethoscope, Users, User, Shield } from "lucide-react";

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

const photoGalleryVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

// Import office photos
import officePhoto1 from "@assets/Office Photo 1_1753972057110.jpeg";
import officePhoto2 from "@assets/Office photo 2_1753972057109.jpeg";
import officePhoto3 from "@assets/Office Photo 3_1753972057109.jpeg";
import officePhoto4 from "@assets/Office Photo 4_1753972057109.jpeg";
import officePhoto5 from "@assets/Office Photo 5_1753972057109.jpeg";
import officePhoto6 from "@assets/Office Photo 6_1753972057109.jpeg";
import officePhoto7 from "@assets/Office Photo 7_1753972057109.jpeg";
import officePhoto8 from "@assets/Office Photo 8_1753972057109.jpeg";
import officePhoto9 from "@assets/Office Photo 9_1753972057108.jpeg";
import officePhoto10 from "@assets/Office Photo 10_1753972057108.jpeg";
import officePhoto11 from "@assets/Office Photo 11_1753972057108.png";
import officePhoto12 from "@assets/Office Photo 12_1753972057108.png";

export default function About() {
  return (
    <div className="pt-16 pb-20 bg-white">
      <Helmet>
        <title>About Us - Family First Smile Care | Los Gatos Dentist</title>
        <meta name="description" content="Learn about Dr. Tim J. Chuang and Family First Smile Care. Our Los Gatos dental practice is built on compassion, personalization, and prevention." />
        <link rel="canonical" href="https://famfirstsmile.com/about" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              variants={fadeInUp}
            >
              About Family First Smile Care
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Founded on the principles of compassionate care and family-centered dentistry
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-6"
              variants={fadeInUp}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-6"
              variants={fadeInUp}
            >
              Family First Smile Care was founded by Dr. Tim J. Chuang with a simple mission: to provide exceptional dental care in a warm, welcoming environment that puts families first. As a locally owned practice in Los Gatos, we understand the unique needs of our community and are committed to building lasting relationships with our patients.
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-6"
              variants={fadeInUp}
            >
              Our practice is built on the foundation of trust, compassion, and excellence. We believe that dental care should be a positive experience for every member of your family, from toddlers taking their first steps into oral health to seniors maintaining their beautiful smiles.
            </motion.p>
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-8"
              variants={staggerContainer}
            >
              <motion.div 
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                >
                  5+
                </motion.div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </motion.div>
              <motion.div 
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                >
                  1000+
                </motion.div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </motion.div>
              <motion.div 
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-600">Families Served</div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
          >
            <motion.div 
              className="rounded-2xl shadow-xl w-full h-96 relative overflow-hidden bg-white"
              variants={scaleIn}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-2 rounded-xl overflow-hidden">
                <iframe
                  src="https://player.vimeo.com/video/1106163189?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;background=1"
                  className="absolute w-full h-full scale-110"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="Family First Smile Care Patient Experience"
                  style={{ border: 'none', outline: 'none' }}
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-gray-50 rounded-2xl p-8 lg:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            variants={fadeInUp}
          >
            Our Mission & Values
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="bg-primary text-white feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <Heart />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-gray-600">We treat every patient with empathy, understanding, and respect, ensuring a comfortable experience for all.</p>
            </motion.div>
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="bg-secondary text-white feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <User />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Personalization</h3>
              <p className="text-gray-600">Every treatment plan is tailored to your unique needs, goals, and comfort level.</p>
            </motion.div>
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="bg-accent text-white feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <Shield />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Prevention</h3>
              <p className="text-gray-600">We focus on preventive care and education to help you maintain optimal oral health for life.</p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            variants={fadeInUp}
          >
            Office Tour
          </motion.h2>
          
          {/* Featured Office Video */}
          <motion.div 
            className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8"
            variants={scaleIn}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h3 
                className="text-2xl font-semibold text-gray-800 mb-4 text-center"
                variants={fadeInUp}
              >
                Visit Our Office
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center mb-6"
                variants={fadeInUp}
              >
                Take a virtual tour of our welcoming Los Gatos location
              </motion.p>
              <motion.div 
                className="flex justify-center"
                variants={scaleIn}
                whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              >
                <div className="relative max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-96 sm:h-[28rem] md:h-[32rem]"
                    src="https://player.vimeo.com/video/1106179834?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;background=1&amp;controls=0"
                    title="Family First Smile Care Office Tour - Los Gatos Location"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    style={{ 
                      border: 'none', 
                      outline: 'none',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto11} 
                alt="Family First Smile Care welcoming front entrance with practice branding" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white font-semibold">Welcoming Front Entrance</span>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto12} 
                alt="Family First Smile Care professional office exterior showing Suite 102" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <motion.div 
                className="absolute inset-0 bg-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white font-semibold">Professional Office Location</span>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto1} 
                alt="Modern dental office reception area with comfortable seating" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <motion.div 
                className="absolute inset-0 bg-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white font-semibold">Comfortable Reception Area</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Additional Office Photos Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto2} 
                alt="Modern dental treatment room with state-of-the-art equipment" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Treatment Room</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto3} 
                alt="Advanced dental technology and equipment" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-secondary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Advanced Technology</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto4} 
                alt="Professional dental consultation space" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-accent/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Consultation Area</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto5} 
                alt="Clean and organized dental office environment" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Clean Environment</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Extended Office Gallery */}
          <motion.div 
            className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto6} 
                alt="Dental office equipment and workspace" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Equipment</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto7} 
                alt="Professional dental workspace setup" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Workspace</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto8} 
                alt="Modern dental facility interior" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Interior</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto9} 
                alt="Additional office space and amenities" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Amenities</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              variants={photoGalleryVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <img 
                src={officePhoto10} 
                alt="Complete view of dental practice facilities" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Facilities</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
