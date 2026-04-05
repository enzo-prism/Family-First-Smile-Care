import { blogPosts, type BlogPost } from "@shared/blog-posts";

export const getBlogPostHref = (slug: string) => `/blog/${slug}`;

export const formatBlogDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(`${value}T12:00:00-07:00`));

const staticLinkMeta: Record<string, { title: string; description?: string }> = {
  "/": {
    title: "Home",
    description: "Return to the Family First Smile Care homepage.",
  },
  "/about": {
    title: "About Family First Smile Care",
    description: "Meet Dr. Chuang and learn about the practice philosophy.",
  },
  "/services": {
    title: "Dental Services",
    description: "Explore care options for children, adults, and families.",
  },
  "/services/children-dentistry": {
    title: "Children's Dentistry",
    description: "Gentle dental care for infants, kids, and growing smiles.",
  },
  "/services/childrens-dentistry/babys-first-visit": {
    title: "Baby's First Visit",
    description: "What to expect at a calm first dental visit for infants and toddlers.",
  },
  "/services/dental-exams": {
    title: "Dental Exams",
    description: "Comprehensive checkups to catch problems early.",
  },
  "/services/dental-hygiene": {
    title: "Dental Hygiene",
    description: "Professional cleanings and preventive care guidance.",
  },
  "/services/family-dentistry": {
    title: "General & Family Dentistry",
    description: "Comprehensive care for children, teens, and adults.",
  },
  "/services/invisalign": {
    title: "Invisalign",
    description: "Clear aligner treatment with digital planning and smile previews.",
  },
  "/technology/itero-digital-scanner": {
    title: "iTero Digital Scanner",
    description: "Comfortable digital scans for Invisalign and restorative planning.",
  },
  "/patient-info": {
    title: "Patient Info",
    description: "FAQs, visit prep, and practical oral health resources.",
  },
  "/patient-info/brushing": {
    title: "How to Brush Properly",
    description: "Step-by-step brushing tips for healthier teeth and gums.",
  },
  "/patient-info/flossing": {
    title: "Flossing Fundamentals",
    description: "Daily flossing guidance to protect gums and prevent cavities.",
  },
  "/patient-info/nutrition": {
    title: "Nutrition for Healthy Teeth",
    description: "Food and drink habits that support a healthier smile.",
  },
  "/team": {
    title: "Our Team",
    description: "Get to know Dr. Chuang and the Family First team.",
  },
  "/contact": {
    title: "Contact & Scheduling",
    description: "Request an appointment or get directions to the office.",
  },
  "/tmj": {
    title: "TMJ Treatment",
    description: "Care for jaw pain, clenching, and TMJ-related symptoms.",
  },
  "/blog": {
    title: "Dental Blog",
    description: "Browse the latest family dentistry articles and local guides.",
  },
};

export const resolveBlogLinkMeta = (href: string) => {
  if (href.startsWith("/blog/")) {
    const slug = href.replace("/blog/", "");
    const post = blogPosts.find((entry) => entry.slug === slug);
    if (post) {
      return {
        title: post.title,
        description: post.metaDescription,
      };
    }
    return null;
  }

  if (staticLinkMeta[href]) {
    return staticLinkMeta[href];
  }

  return null;
};

export const getRelatedBlogLinks = (post: BlogPost) => {
  const links = post.internalLinks
    .map((href) => {
      const meta = resolveBlogLinkMeta(href);
      return meta ? { href, ...meta } : null;
    })
    .filter((link): link is { href: string; title: string; description?: string } =>
      Boolean(link && link.href !== getBlogPostHref(post.slug)),
    );

  const seen = new Set(links.map((link) => link.href));

  for (const candidate of blogPosts) {
    if (candidate.slug === post.slug) continue;
    const href = getBlogPostHref(candidate.slug);
    if (seen.has(href)) continue;
    links.push({
      href,
      title: candidate.title,
      description: candidate.metaDescription,
    });
    seen.add(href);
    if (links.length >= 6) break;
  }

  return links.slice(0, 6);
};

export type BlogContentBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] };

const isLooseHeading = (line: string, nextLine: string | undefined) => {
  if (!line || /[.?!:]$/.test(line)) return false;
  if ((nextLine ?? "").trim() !== "") return false;
  return line.length <= 90;
};

export const parseBlogMarkdown = (markdown: string): BlogContentBlock[] => {
  const lines = markdown.split(/\r?\n/);
  const blocks: BlogContentBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      index += 1;
      continue;
    }

    if (isLooseHeading(line, lines[index + 1])) {
      blocks.push({ type: "h2", text: line });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+[.)]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+[.)]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index].trim();
      if (!nextLine) break;
      if (nextLine.startsWith("## ") || nextLine.startsWith("### ")) break;
      if (/^[-*]\s+/.test(nextLine) || /^\d+[.)]\s+/.test(nextLine)) break;
      if (isLooseHeading(nextLine, lines[index + 1])) break;
      paragraph.push(nextLine);
      index += 1;
    }

    blocks.push({ type: "p", text: paragraph.join(" ") });
  }

  return blocks;
};
