import type { FaqItem } from "./marketing-pages";

export const practiceInfo = {
  name: "Family First Smile Care",
  url: "https://famfirstsmile.com",
  telephone: "+1-408-358-8100",
  email: "hello@famfirstsmile.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15251 National Ave, Suite 102",
    addressLocality: "Los Gatos",
    addressRegion: "CA",
    postalCode: "95032",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/famfirstsmile/",
    "https://www.instagram.com/famfirstsmile/",
  ],
} as const;

export const buildLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  name: practiceInfo.name,
  url: practiceInfo.url,
  telephone: practiceInfo.telephone,
  email: practiceInfo.email,
  address: practiceInfo.address,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "00:00",
      closes: "00:00",
      description: "Closed",
    },
  ],
  sameAs: practiceInfo.sameAs,
});

export const buildServiceSchema = (
  name: string,
  description: string,
  url: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url,
  provider: {
    "@type": "Dentist",
    name: practiceInfo.name,
    url: practiceInfo.url,
    telephone: practiceInfo.telephone,
    address: practiceInfo.address,
  },
  areaServed: {
    "@type": "City",
    name: "Los Gatos",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
});

export const buildFaqSchema = (faqs: ReadonlyArray<FaqItem>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
