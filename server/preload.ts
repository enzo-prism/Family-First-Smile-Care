import { normalizePath } from "@shared/seo";
import { invisalignContent, iteroContent } from "@shared/marketing-pages";
import { services } from "@shared/services";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderList = (items: ReadonlyArray<string>) =>
  `<ul>${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;

const renderOrderedList = (items: ReadonlyArray<string>) =>
  `<ol>${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ol>`;

const renderFaqs = (
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) =>
  faqs
    .map(
      (faq) =>
        `<div><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(
          faq.answer,
        )}</p></div>`,
    )
    .join("");

const defaultPreloadContent = `
<section class="preload-content">
  <header>
    <h1>Family First Smile Care | Gentle Dentistry in Los Gatos, CA</h1>
    <p>Family First Smile Care provides compassionate dental care for children, teens, and adults in Los Gatos with services that include preventive exams, dental crowns, Invisalign, TMJ treatment, and emergency dentistry.</p>
  </header>
  <section>
    <h2>Featured Dental Services</h2>
    <p>Our Los Gatos dental office offers a complete range of family-focused treatments to keep every smile healthy.</p>
    <ul>
      <li><a href="/services/dental-exams">Comprehensive Dental Exams</a></li>
      <li><a href="/services/dental-hygiene">Professional Dental Cleanings</a></li>
      <li><a href="/services/dental-crowns">Custom Dental Crowns &amp; Restorations</a></li>
      <li><a href="/services/invisalign">Invisalign Clear Aligners</a></li>
      <li><a href="/services/night-guards">Night Guards for Bruxism</a></li>
      <li><a href="/services/teeth-whitening">Professional Teeth Whitening</a></li>
      <li><a href="/tmj">TMJ and Jaw Pain Treatment</a></li>
    </ul>
  </section>
  <section>
    <h2>Visit Our Los Gatos Dental Office</h2>
    <p>Address: 15251 National Ave, Suite 102, Los Gatos, CA 95032</p>
    <p>Phone: <a href="tel:4083588100">(408) 358-8100</a> | Email: <a href="mailto:hello@famfirstsmile.com">hello@famfirstsmile.com</a></p>
    <p>Hours: Monday - Thursday 9:00 AM - 5:00 PM | Friday Closed</p>
    <p><a href="/contact">Request an appointment online</a> or explore our <a href="/patient-info">patient information</a> to prepare for your first visit.</p>
  </section>
</section>
`;

const renderInvisalignPreload = () => {
  const invisalignService = services
    .flatMap((service) => [service, ...(service.subServices ?? [])])
    .find((service) => service.id === "invisalign");
  const details = invisalignService?.details ?? [];
  const process = invisalignService?.process ?? [];

  return `
<section class="preload-content">
  <header>
    <h1>${escapeHtml(invisalignContent.hero.title)}</h1>
    <p>${escapeHtml(invisalignContent.hero.subtitle)}</p>
  </header>
  <section>
    <h2>${escapeHtml(invisalignContent.iteroSection.heading)}</h2>
    ${invisalignContent.iteroSection.paragraphs
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("")}
    ${renderList(invisalignContent.iteroSection.bullets)}
    <p>${escapeHtml(invisalignContent.iteroSection.disclaimer)}</p>
    <p>Learn more about our <a href="/technology/itero-digital-scanner">iTero digital scanner</a> and how it supports Invisalign planning.</p>
  </section>
  <section>
    <h2>What's Included</h2>
    ${renderList(details)}
  </section>
  <section>
    <h2>Our Process</h2>
    ${renderOrderedList(process)}
  </section>
  <section>
    <h2>${escapeHtml(invisalignContent.whatCanHelp.heading)}</h2>
    ${renderList(invisalignContent.whatCanHelp.bullets)}
  </section>
  <section>
    <h2>Invisalign &amp; iTero FAQs</h2>
    ${renderFaqs(invisalignContent.faqs)}
  </section>
  <p>${escapeHtml(invisalignContent.trademarkNote)}</p>
</section>
`;
};

const renderIteroPreload = () => `
<section class="preload-content">
  <header>
    <h1>${escapeHtml(iteroContent.hero.title)}</h1>
    <p>${escapeHtml(iteroContent.hero.subtitle)}</p>
  </header>
  <section>
    <h2>${escapeHtml(iteroContent.whatIs.heading)}</h2>
    <p>${escapeHtml(iteroContent.whatIs.body)}</p>
  </section>
  <section>
    <h2>${escapeHtml(iteroContent.whyUse.heading)}</h2>
    ${renderList(iteroContent.whyUse.bullets)}
    <p>Learn more about <a href="/services/invisalign">Invisalign clear aligners</a> and how we use digital scans to personalize treatment.</p>
  </section>
  <section>
    <h2>${escapeHtml(iteroContent.whatToExpect.heading)}</h2>
    ${renderOrderedList(iteroContent.whatToExpect.steps)}
  </section>
  <section>
    <h2>iTero Scanner FAQs</h2>
    ${renderFaqs(iteroContent.faqs)}
  </section>
  <section>
    <h2>Book Your Appointment</h2>
    <p>Schedule online or call (408) 358-8100 to book your iTero scan.</p>
  </section>
  <p>${escapeHtml(iteroContent.trademarkNote)}</p>
</section>
`;

export const renderPreloadContent = (path: string) => {
  const normalized = normalizePath(path);

  if (normalized === "/services/invisalign") {
    return renderInvisalignPreload();
  }

  if (normalized === "/technology/itero-digital-scanner") {
    return renderIteroPreload();
  }

  return defaultPreloadContent;
};
