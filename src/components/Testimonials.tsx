import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote:
        "The Emblm transformed our brand identity completely. Their strategic approach and attention to detail resulted in a 300% increase in brand recognition within just six months.",
      author: "Sarah Chen",
      position: "CEO, TechFlow Innovations",
      company: "Fortune 500 Technology Company"
    },
    {
      id: 2,
      quote:
        "Working with The Emblm was like having a team of brand strategists, designers, and marketing experts all rolled into one. They don't just create; they architect experiences.",
      author: "Michael Rodriguez",
      position: "Marketing Director, GreenVibe",
      company: "Sustainable Lifestyle Brand"
    },
    {
      id: 3,
      quote:
        "The results speak for themselves - our digital presence is now unrecognizable from where we started. The Emblm understood our vision and brought it to life in ways we never imagined.",
      author: "Dr. Amanda Foster",
      position: "Founder, MedConnect",
      company: "Healthcare Technology Startup"
    },
    {
      id: 4,
      quote:
        "Their strategic thinking goes beyond traditional branding. The Emblm helped us discover not just who we are, but who we aspire to be as a company.",
      author: "James Park",
      position: "Creative Director, Artisan Collective",
      company: "Design & Architecture Firm"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#FFF9F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-[#1C1C1C] mb-4 lg:mb-6">
            What They Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#B0A8A2] max-w-3xl mx-auto px-4">
            The voices of those who trusted us with their brand's future
            and saw remarkable transformations.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Container with fixed height based on content */}
          <div className="relative">
            <div className="min-h-[400px] sm:min-h-[350px] lg:min-h-[320px] flex items-center">
              <div 
                className="w-full transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4 sm:px-8"
                    >
                      <div className="text-center">
                        <Quote className="h-12 w-12 sm:h-16 sm:w-16 text-[#C62828] mx-auto mb-6 lg:mb-8" />

                        <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-[#1C1C1C] mb-8 lg:mb-12 leading-relaxed max-w-4xl mx-auto">
                          "{testimonial.quote}"
                        </blockquote>

                        <div className="border-t border-[#B0A8A2]/30 pt-6 lg:pt-8 max-w-md mx-auto">
                          <h4 className="text-lg sm:text-xl font-medium text-[#1C1C1C] mb-2">
                            {testimonial.author}
                          </h4>
                          <p className="text-[#B0A8A2] mb-1 text-sm sm:text-base">
                            {testimonial.position}
                          </p>
                          <p className="text-[#C62828] text-xs sm:text-sm font-medium">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center mt-8 lg:mt-12 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 sm:p-3 bg-white border border-[#B0A8A2] rounded-full hover:bg-[#C62828] hover:text-white hover:border-[#C62828] transition-all duration-200 touch-manipulation"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation ${
                    index === currentIndex
                      ? 'bg-[#C62828] scale-125'
                      : 'bg-[#B0A8A2] hover:bg-[#E57373]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 sm:p-3 bg-white border border-[#B0A8A2] rounded-full hover:bg-[#C62828] hover:text-white hover:border-[#C62828] transition-all duration-200 touch-manipulation"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;