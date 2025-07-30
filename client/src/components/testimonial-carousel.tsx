import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kevin L.",
    title: "Parent of 3-year-old patient",
    content: "Dr. Chuang was so patient with my toddler! She actually enjoyed her visit and can't wait to go back. The staff made the whole experience stress-free for our family.",
    rating: 5
  },
  {
    id: 2,
    name: "Eternal E.",
    title: "Long-time patient",
    content: "Best dentist experience ever! The office is beautiful and calming, and Dr. Chuang explained everything thoroughly. I finally found a dentist I trust completely.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah M.",
    title: "Invisalign patient",
    content: "The Invisalign treatment exceeded my expectations. Dr. Chuang and his team made the process seamless, and I'm thrilled with my new smile!",
    rating: 5
  },
  {
    id: 4,
    name: "Michael R.",
    title: "Anxious patient",
    content: "As someone with dental anxiety, I was nervous about finding a new dentist. Dr. Chuang's gentle approach and the welcoming atmosphere put me completely at ease.",
    rating: 5
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="testimonial-card p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Carousel Navigation */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full"
        onClick={previousTestimonial}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4 text-primary" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full"
        onClick={nextTestimonial}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4 text-primary" />
      </Button>
      
      {/* Carousel Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 rounded-full p-0 ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => goToTestimonial(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
