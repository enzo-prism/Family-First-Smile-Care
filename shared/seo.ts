import { services, type Service } from "./services";

const canonicalOverrides: Record<string, string> = {
  "/services/tmj": "/tmj",
};

export const normalizePath = (path: string) => {
  const trimmed = path.split(/[?#]/)[0] || "/";
  if (trimmed === "/") return "/";
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
};

export const resolveCanonicalPath = (path: string) => {
  const normalized = normalizePath(path);
  return canonicalOverrides[normalized] ?? normalized;
};

export interface PageMeta {
  title: string;
  description: string;
}

const staticMeta: Record<string, PageMeta> = {
  "/": {
    title: "Family First Smile Care - Gentle Dental Care in Los Gatos, CA",
    description: "Gentle, compassionate dental care for the whole family in Los Gatos, CA. Dr. Tim J. Chuang offers comprehensive dental services in a welcoming environment.",
  },
  "/about": {
    title: "About Us - Family First Smile Care | Los Gatos Dentist",
    description: "Learn about Dr. Tim J. Chuang and Family First Smile Care. Our Los Gatos dental practice is built on compassion, personalization, and prevention.",
  },
  "/services": {
    title: "Dental Services - Family First Smile Care | Los Gatos",
    description: "Comprehensive dental services including children's dentistry, dental exams, hygiene, general & family care, night guards, restorative dentistry, Invisalign, teeth whitening, dental crowns, and TMJ treatment in Los Gatos, CA.",
  },
  "/team": {
    title: "Meet Our Team - Dr. Tim J. Chuang | Los Gatos Dentist",
    description: "Meet Dr. Tim J. Chuang and our caring dental team. Experienced professionals providing gentle, compassionate dental care in Los Gatos, CA.",
  },
  "/patient-info": {
    title: "Patient Information - Family First Smile Care | Los Gatos",
    description: "Important patient information including insurance, FAQs, and office policies. Get prepared for your visit to Family First Smile Care in Los Gatos, CA.",
  },
  "/contact": {
    title: "Contact Us - Family First Smile Care | Los Gatos Dentist",
    description: "Contact Family First Smile Care in Los Gatos, CA. Schedule your appointment today at (408) 358-8100 or visit us at 15251 National Ave, Suite 102.",
  },
  "/tmj": {
    title: "TMJ Treatment in Los Gatos - Family First Smile Care",
    description: "Expert TMJ treatment in Los Gatos by Dr. Tim J. Chuang. Relief for jaw pain, headaches, and TMD symptoms with personalized care and advanced technology.",
  },
};

const fallbackMeta: PageMeta = {
  title: "Page Not Found - Family First Smile Care",
  description: "The page you're looking for doesn't exist. Return to our homepage or contact us for assistance.",
};

const allServices: Service[] = services.flatMap((service) => [
  service,
  ...(service.subServices ?? []),
]);
const serviceById = new Map(allServices.map((service) => [service.id, service]));

const buildServiceMeta = (service: Service): PageMeta => {
  const baseDescription = service.heroDescription || service.description;
  const title =
    service.seoTitle || `${service.title} - Family First Smile Care | Los Gatos`;
  const description =
    service.seoDescription ||
    `${baseDescription} Professional ${service.title.toLowerCase()} services in Los Gatos, CA by Dr. Tim J. Chuang.`;

  return { title, description };
};

export const resolvePageMeta = (path: string): PageMeta => {
  const canonicalPath = resolveCanonicalPath(path);

  if (staticMeta[canonicalPath]) {
    return staticMeta[canonicalPath];
  }

  if (canonicalPath.startsWith("/services/")) {
    const slug = canonicalPath.replace("/services/", "");
    const service = serviceById.get(slug);
    if (service) return buildServiceMeta(service);
  }

  return fallbackMeta;
};
