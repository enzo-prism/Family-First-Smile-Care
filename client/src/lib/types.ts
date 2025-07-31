export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  content: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  featured?: boolean;
  subServices?: Service[];
  heroDescription?: string;
  longDescription?: string;
  benefits?: string[];
  process?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
