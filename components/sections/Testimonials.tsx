"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { testimonials } from "@/data";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
            What people say about working with me and the results we&apos;ve
            achieved together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base sm:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm truncate">
                      {testimonial.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex mt-3 sm:mt-4 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
                    >
                      ⭐
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
