import { Helmet } from "react-helmet-async";
import { Link, useParams } from "wouter";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBreadcrumbs from "@/components/navigation/PageBreadcrumbs";
import RelatedLinksSection from "@/components/navigation/RelatedLinksSection";
import { blogPostMap } from "@shared/blog-posts";
import {
  formatBlogDate,
  getBlogPostHref,
  getRelatedBlogLinks,
  parseBlogMarkdown,
} from "@/lib/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const post = slug ? blogPostMap.get(slug) : undefined;

  if (!post) {
    return (
      <div className="pt-16 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Article not found</h1>
          <p className="mt-4 text-gray-600">
            The blog post you were looking for is not here, which is rude of it.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/blog">Back to the blog</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const contentBlocks = parseBlogMarkdown(post.markdown);
  const relatedLinks = getRelatedBlogLinks(post);
  const canonicalUrl = `https://famfirstsmile.com${getBlogPostHref(post.slug)}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Family First Smile Care",
    },
    publisher: {
      "@type": "Organization",
      name: "Family First Smile Care",
      logo: {
        "@type": "ImageObject",
        url: "https://famfirstsmile.com/attached_assets/Logo_1753972987510.png",
      },
    },
    about: post.primaryKeyword,
  };

  return (
    <div className="pt-16 pb-20 bg-white">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
                <CalendarDays className="h-4 w-4 text-primary" />
                {formatBlogDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
                <Clock3 className="h-4 w-4 text-primary" />
                {post.readTimeMinutes} min read
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {post.metaDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">Book an Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Link href="/blog">Browse all articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="mb-10">
          <Button asChild variant="ghost" className="px-0 text-primary hover:bg-transparent hover:text-primary/80">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
          </Button>
        </div>

        <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700 prose-a:text-primary">
            {contentBlocks.map((block, index) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={`${block.type}-${index}`} className="mt-10 text-3xl font-bold text-gray-900 first:mt-0">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={`${block.type}-${index}`} className="mt-8 text-2xl font-semibold text-gray-900">
                      {block.text}
                    </h3>
                  );
                case "ul":
                  return (
                    <ul key={`${block.type}-${index}`} className="mt-4 list-disc space-y-2 pl-6 text-gray-700 marker:text-primary">
                      {block.items.map((item, itemIndex) => (
                        <li key={`${itemIndex}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={`${block.type}-${index}`} className="mt-4 list-decimal space-y-2 pl-6 text-gray-700 marker:font-semibold marker:text-primary">
                      {block.items.map((item, itemIndex) => (
                        <li key={`${itemIndex}-${item}`}>{item}</li>
                      ))}
                    </ol>
                  );
                case "p":
                default:
                  return (
                    <p key={`${block.type}-${index}`} className="mt-5 leading-8 text-gray-700 first:mt-0">
                      {block.text}
                    </p>
                  );
              }
            })}
          </div>
        </article>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Want a calm answer for your family's next dental question?</h2>
          <p className="mt-3 max-w-3xl text-white/95">
            Family First Smile Care helps Los Gatos families with preventive visits, kids' dentistry, Invisalign, and the real-world dental curveballs that never arrive at a convenient time.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact">Contact our office</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </div>

        <RelatedLinksSection title="Related reading" links={relatedLinks} />
      </div>
    </div>
  );
}
