import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { Heart, Microscope, Users, Stethoscope, Baby, Sparkles, Smile } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                Gentle, Compassionate Dental Care for the Whole Family
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We provide exceptional dental care in a warm environment to foster healthy smiles for life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-primary text-white hover:bg-blue-700 text-lg font-semibold px-8 py-3">
                    Schedule Appointment
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-semibold px-8 py-3">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Happy family at dental office" 
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center">
                  <span className="text-accent mr-2">⭐</span>
                  <span className="font-semibold">5.0 Rating</span>
                </div>
                <p className="text-sm text-gray-600">From 200+ Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Why Choose Family First Smile Care?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We're committed to providing exceptional dental care that puts your family's comfort and health first.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary text-white feature-icon mx-auto mb-4">
                <Heart />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassionate Care</h3>
              <p className="text-gray-600">Gentle, patient-centered approach that puts your comfort first, especially for children and anxious patients.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-secondary text-white feature-icon mx-auto mb-4">
                <Microscope />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Technology</h3>
              <p className="text-gray-600">State-of-the-art equipment including digital X-rays and CBCT scanners for precise, efficient treatment.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-accent text-white feature-icon mx-auto mb-4">
                <Users />
              </div>
              <h3 className="text-xl font-semibold mb-3">Family-Focused</h3>
              <p className="text-gray-600">Comprehensive care for all ages, from your child's first visit to adult preventive and cosmetic dentistry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Our Featured Services</h2>
            <p className="text-xl text-gray-600">Comprehensive dental care tailored to your family's unique needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="service-card p-6">
              <Stethoscope className="text-primary text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2">Family Dentistry</h3>
              <p className="text-gray-600 text-sm mb-4">Routine check-ups, cleanings, and preventive care for all ages.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0">Learn More</Button>
              </Link>
            </div>
            
            <div className="service-card p-6">
              <Baby className="text-secondary text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2">Children's Dentistry</h3>
              <p className="text-gray-600 text-sm mb-4">Gentle first visits and child-friendly approach with toys and stickers.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0">Learn More</Button>
              </Link>
            </div>
            
            <div className="service-card p-6">
              <Sparkles className="text-accent text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dental Hygiene</h3>
              <p className="text-gray-600 text-sm mb-4">Professional cleanings and education for maintaining strong smiles.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0">Learn More</Button>
              </Link>
            </div>
            
            <div className="service-card p-6">
              <Smile className="text-primary text-3xl mb-4" />
              <h3 className="text-lg font-semibold mb-2">Invisalign</h3>
              <p className="text-gray-600 text-sm mb-4">Clear aligners for straightening teeth with free consultations.</p>
              <Link href="/services">
                <Button variant="link" className="text-primary font-medium p-0">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real stories from families who trust us with their smiles</p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready for Your Best Smile?</h2>
          <p className="text-xl mb-8 opacity-90">Schedule your free Invisalign consultation today and take the first step towards a healthier, more confident smile.</p>
          <Link href="/contact">
            <Button className="bg-white text-primary hover:bg-gray-100 text-lg font-semibold px-8 py-3">
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
