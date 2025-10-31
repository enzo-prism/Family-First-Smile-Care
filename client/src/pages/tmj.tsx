import type { MouseEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Activity, Shield, Stethoscope, CheckCircle, Clock, Users } from "lucide-react";
import { APPOINTMENT_FORM_URL, triggerGoogleAdsConversion } from "@/lib/analytics";

export default function TMJ() {
  const handleAppointmentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerGoogleAdsConversion(APPOINTMENT_FORM_URL, "_blank");
  };

  return (
    <div className="pt-16 pb-20 bg-white">
      <Helmet>
        <title>TMJ Treatment in Los Gatos - Family First Smile Care</title>
        <meta name="description" content="Expert TMJ treatment in Los Gatos by Dr. Tim J. Chuang. Relief for jaw pain, headaches, and TMD symptoms with personalized care and advanced technology." />
        <link rel="canonical" href="https://famfirstsmile.com/tmj" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">TMJ Treatment in Los Gatos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find relief from jaw pain and dysfunction with personalized TMJ treatment from Dr. Tim J. Chuang</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Understanding TMJ Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Understanding TMJ</h2>
              <p className="text-gray-600 mb-6">
                The temporomandibular joint, commonly referred to as TMJ, is one of the most complex joints in the human body. Located on both sides of your jaw, it connects your jawbone to your skull and allows for essential functions like chewing, speaking, and even smiling.
              </p>
              <p className="text-gray-600 mb-6">
                However, when this joint becomes inflamed or dysfunctional, it can lead to a condition known as temporomandibular joint disorder (TMD). Common symptoms include jaw pain, stiffness, headaches, difficulty chewing, and clicking sounds when opening or closing your mouth.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Common TMJ Symptoms</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Jaw pain and stiffness
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Frequent headaches
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Difficulty chewing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Clicking or popping sounds
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Limited jaw movement
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Treatment Options Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How TMJ Treatment in Los Gatos Can Help</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Living with the discomfort and pain caused by TMJ issues can be overwhelming, but effective treatment options are available. At Family First Smile Care, we take a personalized approach to address your specific symptoms and needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Night Guards</h3>
              <p className="text-gray-600">We design night guards to prevent teeth grinding and clenching, which can exacerbate TMJ discomfort.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Orthodontic Solutions</h3>
              <p className="text-gray-600">Conditions related to bite misalignment can be treated through customized orthodontic treatment plans, such as braces or Invisalign.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Physical Therapy</h3>
              <p className="text-gray-600">Jaw exercises and muscle relaxation techniques can alleviate tension and improve function.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lifestyle Modifications</h3>
              <p className="text-gray-600">Stress reduction, dietary changes, and exercise can often significantly improve the management of TMJ symptoms.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Procedures</h3>
              <p className="text-gray-600">For more severe cases, we may recommend targeted treatments, such as restorative dental work, to improve the alignment of your bite.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">CBCT Imaging</h3>
              <p className="text-gray-600">Advanced digital imaging using our CBCT Scanner provides precise views of your jaw structure for accurate diagnosis.</p>
            </div>
          </div>
        </div>

        {/* Consultation Process */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-8">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What to Expect During Your TMJ Consultation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your first step toward finding relief is scheduling a consultation with Dr. Tim Chuang at Family First Smile Care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-lg">1</div>
              <h3 className="font-semibold text-gray-800 mb-2">Thorough Assessment</h3>
              <p className="text-gray-600">We conduct a comprehensive evaluation of your jaw function and symptoms.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-lg">2</div>
              <h3 className="font-semibold text-gray-800 mb-2">Advanced Imaging</h3>
              <p className="text-gray-600">Digital imaging using our CBCT Scanner provides precise views of your jaw structure.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-lg">3</div>
              <h3 className="font-semibold text-gray-800 mb-2">Personalized Plan</h3>
              <p className="text-gray-600">We develop a treatment plan tailored specifically to your needs and symptoms.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Family First Smile Care for TMJ Treatment?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Family First Smile Care in Los Gatos, we pride ourselves on providing high-quality, patient-centered care in a comfortable and modern setting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Advanced Technology</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  CBCT Scanner for detailed 3D imaging
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Digital X-rays for precise diagnosis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Intraoral scanner technology
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Panoramic imaging capabilities
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Comfort</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Soft blankets and pillow support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  TVs in treatment rooms
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Wheelchair accessible facility
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  Financing options available
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Schedule Your TMJ Consultation Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't let TMJ pain interfere with your daily life. Take the first step toward a healthy, pain-free smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={APPOINTMENT_FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleAppointmentClick}
            >
              <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3">
                Schedule Consultation
              </Button>
            </a>
            <Link href="/contact">
              <Button className="bg-white/20 text-white border border-white/30 hover:bg-white hover:text-primary font-semibold px-8 py-3 backdrop-blur-sm">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
