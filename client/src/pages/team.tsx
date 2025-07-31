import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Stethoscope, Heart, UserRound, HandHeart, Users } from "lucide-react";
import drChuangPhoto from "@assets/Dr. Chuang_1753971820008.png";
import dentalAssistantPhoto from "@assets/Dental Assisitant_1753971816018.png";
import officeManagerPhoto from "@assets/Office Manager_1753971816019.png";

export default function Team() {
  return (
    <div className="pt-16 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Dedicated professionals committed to providing exceptional dental care with compassion and expertise</p>
        </div>
        
        {/* Dr. Chuang Bio */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <img 
                src={drChuangPhoto} 
                alt="Dr. Tim J. Chuang, DDS professional headshot" 
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Dr. Tim J. Chuang, DDS</h2>
              <p className="text-xl text-primary font-semibold mb-6">Lead Dentist & Practice Owner</p>
              
              <div className="space-y-4 text-gray-600 mb-8">
                <p>Dr. Chuang was born and raised in Cupertino, where his passion for healthcare and helping others began at an early age. He has deep roots in the local community and understands the unique needs of Bay Area families, bringing a wealth of knowledge and gentle touch to every patient interaction.</p>
                
                <p>He pursued his undergraduate studies at the University of California, San Diego (UCSD), earning a bachelor's degree in Human Biology. His strong interest in dentistry and commitment to patient care led him back to the Bay Area, where he continued his education in one of the nation's top dental programs.</p>
                
                <p>In 2020, Dr. Chuang graduated from the prestigious University of the Pacific (UOP) School of Dentistry in San Francisco, where he honed his skills in comprehensive dental care. Seeking to further expand his expertise, he moved to the Big Island of Hawaii to complete a residency in general dentistry.</p>
                
                <p>During his residency, he gained hands-on experience in advanced procedures, treating a diverse patient population, and refining his approach to providing high-quality, patient-centered care. This comprehensive training has shaped his signature gentle approach that patients know and trust.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-primary text-white feature-icon mx-auto mb-3">
                    <GraduationCap />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Education</h3>
                  <p className="text-sm text-gray-600">University of the Pacific School of Dentistry</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary text-white feature-icon mx-auto mb-3">
                    <Stethoscope />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Experience</h3>
                  <p className="text-sm text-gray-600">5+ Years in Practice</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent text-white feature-icon mx-auto mb-3">
                    <Heart />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Specialty</h3>
                  <p className="text-sm text-gray-600">Gentle, Family-Centered Care</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Dr. Chuang's Approach</h3>
                <p className="text-gray-600 italic">"I believe that dental care should be a positive experience for every patient. My goal is to provide thorough explanations, gentle treatment, and personalized care that helps each patient feel comfortable and confident about their oral health."</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Caring Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Behind every great dentist is an exceptional team. Our friendly hygienists, assistants, and staff are dedicated to making your visit comfortable and stress-free.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <img 
                src={dentalAssistantPhoto} 
                alt="Dental Assistant team member" 
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-md"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Dental Assistant</h3>
            <p className="text-gray-600">Our skilled assistant supports Dr. Chuang and ensures your comfort throughout every procedure, big or small.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <img 
                src={officeManagerPhoto} 
                alt="Office Manager team member" 
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-md"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Office Manager</h3>
            <p className="text-gray-600">Our welcoming office manager handles scheduling, insurance, and ensures your visit runs smoothly from start to finish.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-accent text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Extended Team</h3>
            <p className="text-gray-600">Additional hygienists and support staff work together to provide comprehensive care for your entire family.</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Dental Family</h2>
          <p className="text-gray-600 mb-6">Experience the difference that compassionate, personalized dental care can make for you and your family.</p>
          <Link href="/contact">
            <Button className="bg-primary text-white hover:bg-blue-700 font-semibold px-8 py-3">
              Meet Us Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
