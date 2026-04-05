import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBreadcrumbs from "@/components/navigation/PageBreadcrumbs";
import { blogPosts } from "@shared/blog-posts";
import { formatBlogDate, getBlogPostHref } from "@/lib/blog";

const featuredPosts = blogPosts.slice(0, 3);
const remainingPosts = blogPosts.slice(3);
const latestPost = blogPosts[0];

export default function Blog() {
  if (!latestPost) {
    return null;
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Family First Smile Care Blog",
    url: "https://famfirstsmile.com/blog",
    description:
      "Family dentistry articles, preventive care guides, and practical oral health answers for Los Gatos families.",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://famfirstsmile.com${getBlogPostHref(post.slug)}`,
      datePublished: post.publishedAt,
      description: post.metaDescription,
    })),
  };

  return (
    <div className="pt-16 pb-20 bg-white">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10">
              <Sparkles className="mr-2 h-4 w-4" />
              Local dental answers for Los Gatos families
            </div>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              Family First Smile Care Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse practical guides on kids' dentistry, preventive care, Invisalign, emergencies, and the small dental questions that like to show up right when life is already busy.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href={getBlogPostHref(latestPost.slug)}>Read the Latest Article</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Link href="/contact">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <section>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured articles</h2>
              <p className="mt-2 text-gray-600">
                The newest posts from the Family First content pipeline, now actually living on the site where they belong.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <Link key={post.slug} href={getBlogPostHref(post.slug)} className={`group block h-full ${index === 0 ? "lg:col-span-2" : ""}`}>
                <article className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-xl">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {formatBlogDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-primary" />
                      {post.readTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-7 text-gray-600">{post.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All articles</h2>
            <p className="mt-2 text-gray-600">
              Every synced Family First draft currently published in the site repo.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => (
              <Link key={post.slug} href={getBlogPostHref(post.slug)} className="group block h-full">
                <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>{formatBlogDate(post.publishedAt)}</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-gray-600">{post.metaDescription}</p>
                  <div className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">
                    Open article
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
