import { Heart, Stethoscope, Users, User, Shield } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">About Family First Smile Care</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Founded on the principles of compassionate care and family-centered dentistry</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Family First Smile Care was founded by Dr. Tim J. Chuang with a simple mission: to provide exceptional dental care in a warm, welcoming environment that puts families first. As a locally owned practice in Los Gatos, we understand the unique needs of our community and are committed to building lasting relationships with our patients.
            </p>
            <p className="text-gray-600 mb-6">
              Our practice is built on the foundation of trust, compassion, and excellence. We believe that dental care should be a positive experience for every member of your family, from toddlers taking their first steps into oral health to seniors maintaining their beautiful smiles.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-gray-600">Families Served</div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-2xl shadow-xl w-full h-96 bg-gradient-to-br from-secondary via-green-400 to-primary flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-blue-50/20"></div>
              <div className="text-center text-white z-10">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium opacity-90">Compassionate Care</p>
                <p className="text-sm opacity-70">Built on Trust & Excellence</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white feature-icon mx-auto mb-4">
                <Heart />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-gray-600">We treat every patient with empathy, understanding, and respect, ensuring a comfortable experience for all.</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white feature-icon mx-auto mb-4">
                <User />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalization</h3>
              <p className="text-gray-600">Every treatment plan is tailored to your unique needs, goals, and comfort level.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white feature-icon mx-auto mb-4">
                <Shield />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prevention</h3>
              <p className="text-gray-600">We focus on preventive care and education to help you maintain optimal oral health for life.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Office Tour</h2>
          
          {/* Featured Office Video */}
          <div className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Visit Our Office</h3>
              <p className="text-gray-600 text-center mb-6">Take a virtual tour of our welcoming Los Gatos location</p>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                  src="https://www.youtube.com/embed/53N7iyvh4Nw?start=2"
                  title="Family First Smile Care Office Tour - Los Gatos Location"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group">
              <img 
                src={officePhoto11} 
                alt="Family First Smile Care welcoming front entrance with practice branding" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Welcoming Front Entrance</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto12} 
                alt="Family First Smile Care professional office exterior showing Suite 102" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Professional Office Location</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto1} 
                alt="Modern dental office reception area with comfortable seating" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Comfortable Reception Area</span>
              </div>
            </div>
          </div>
          
          {/* Additional Office Photos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="relative group">
              <img 
                src={officePhoto2} 
                alt="Modern dental treatment room with state-of-the-art equipment" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Treatment Room</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto3} 
                alt="Advanced dental technology and equipment" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-secondary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Advanced Technology</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto4} 
                alt="Professional dental consultation space" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-accent/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Consultation Area</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto5} 
                alt="Clean and organized dental office environment" 
                className="rounded-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm text-center">Clean Environment</span>
              </div>
            </div>
          </div>
          
          {/* Extended Office Gallery */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            <div className="relative group">
              <img 
                src={officePhoto6} 
                alt="Dental office equipment and workspace" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Equipment</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto7} 
                alt="Professional dental workspace setup" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Workspace</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto8} 
                alt="Modern dental facility interior" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Interior</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto9} 
                alt="Additional office space and amenities" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Amenities</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={officePhoto10} 
                alt="Complete view of dental practice facilities" 
                className="rounded-lg w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-xs text-center">Facilities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
