import { Link } from "wouter";
import { Smile, MapPin, Phone, Mail, Facebook, Instagram, CreditCard, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Smile className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold">Family First Smile Care</span>
            </div>
            <p className="text-gray-300 mb-4">
              Gentle, compassionate dental care for the whole family in Los Gatos, CA.
            </p>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <MapPin className="mr-3 h-4 w-4" />
                <span>15251 National Ave, Suite 102, Los Gatos, CA 95032</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-4 w-4" />
                <span>(408) 358-8100</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-4 w-4" />
                <span>hello@famfirstsmile.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/team" className="hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link href="/patient-info" className="hover:text-primary transition-colors">Patient Info</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li>
                <a 
                  href="https://g.page/r/Cej0Xl18KcCyEAE/review" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Leave a Google Review
                </a>
              </li>
              <li>
                <a 
                  href="https://swipesimple.com/links/lnk_67505de480da165de07d5bd3f42fbcce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Bill Online
                </a>
              </li>
            </ul>
          </div>
          
          {/* Office Hours & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
            <div className="text-gray-300 space-y-1 mb-6">
              <p>Monday - Friday: 9AM - 5PM</p>
              <p>Saturday: By appointment</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/famfirstsmile/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors" 
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/famfirstsmile/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Family First Smile Care. All rights reserved. | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
