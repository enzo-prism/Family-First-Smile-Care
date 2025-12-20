import type { MouseEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewsSection } from "@/components/review";
import { services } from "@/data/services";
import { serviceReviews } from "@/data/reviews";
import { APPOINTMENT_FORM_URL, triggerGoogleAdsConversion } from "@/lib/analytics";
import { invisalignContent } from "@shared/marketing-pages";
import { buildFaqSchema, buildServiceSchema } from "@shared/structured-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Invisalign() {
  const service = services
    .flatMap((item) => [item, ...(item.subServices || [])])
    .find((item) => item.id === "invisalign");

  const handleAppointmentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerGoogleAdsConversion(APPOINTMENT_FORM_URL, "_blank");
  };

  const reviewData = serviceReviews.find((review) => review.serviceId === "invisalign");

  if (!service) {
    return (
      <div className="pt-16 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/services">
            <Button className="bg-primary text-white hover:bg-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const faqSchema = buildFaqSchema(invisalignContent.faqs);
  const serviceSchema = buildServiceSchema(
    "Invisalign Clear Aligners",
    invisalignContent.hero.subtitle,
    "https://famfirstsmile.com/services/invisalign",
  );
  const processSteps = service.process ?? [];
  const benefits = service.benefits ?? [];

  return (
    <div className="pt-16 pb-20 bg-white">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <motion.section
        className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              className="bg-primary text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              variants={scaleIn}
            >
              <Smile className="w-8 h-8" />
            </motion.div>
            <motion.h1
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              variants={fadeInUp}
            >
              {invisalignContent.hero.title}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {invisalignContent.hero.subtitle}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {invisalignContent.iteroSection.heading}
              </h2>
              {invisalignContent.iteroSection.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-gray-600 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <p className="text-gray-600 mt-6">
                Learn more about our{" "}
                <Link href="/technology/itero-digital-scanner" className="text-primary font-semibold">
                  iTero digital scanner
                </Link>
                {" "}and how it supports Invisalign planning.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <ul className="space-y-3 text-gray-700">
                {invisalignContent.iteroSection.bullets.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                {invisalignContent.iteroSection.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {reviewData && reviewData.reviews.length > 0 && (
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <ReviewsSection
              reviews={reviewData.reviews}
              title="Invisalign Patient Reviews"
              showCTA={true}
            />
          </motion.div>
        )}

        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/services">
            <Button variant="ghost" className="text-primary hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Services
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Invisalign</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.longDescription}
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8"
              variants={scaleIn}
            >
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                What's Included
              </h3>
              <ul className="space-y-3 text-gray-600">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {invisalignContent.whatCanHelp.heading}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {invisalignContent.whatCanHelp.bullets.map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Benefits of Invisalign
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how Invisalign clear aligners can improve your smile and confidence.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <p className="text-gray-700 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here's what you can expect during Invisalign treatment.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center"
                variants={scaleIn}
              >
                <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 font-medium">{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Invisalign &amp; iTero FAQs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about Invisalign and iTero digital scans.
            </p>
          </div>
          <div className="space-y-6">
            {invisalignContent.faqs.map((faq) => (
              <div key={faq.question} className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-center text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Schedule your Invisalign consultation and take the first step toward a healthier, confident smile.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <a
              href={APPOINTMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={handleAppointmentClick}
            >
              <motion.button
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl text-lg shadow-lg w-full sm:w-auto transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Appointment
              </motion.button>
            </a>
            <span className="text-white/80 text-sm">or call (408) 358-8100</span>
          </motion.div>
        </motion.div>

        <p className="text-xs text-gray-500 text-center mt-8">
          {invisalignContent.trademarkNote}
        </p>
      </div>
    </div>
  );
}
