"use client";
import { motion } from "framer-motion";
import { workExperience } from "@/data";
import { Award, Calendar, MapPin, ArrowRight } from "lucide-react";

export const Experience = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Work Experience
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            My professional journey in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent" />

          <div className="space-y-8 sm:space-y-12">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  {/* Connection Line - Hidden on mobile */}
                  <div
                    className={`hidden sm:block absolute top-6 sm:top-8 w-8 h-0.5 bg-gradient-to-r ${
                      index % 2 === 0
                        ? "left-12 sm:left-16 from-cyan-400 to-transparent"
                        : "right-12 sm:right-16 from-transparent to-purple-500"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className={`flex-1 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 ${
                    index % 2 === 0 ? "sm:ml-8" : "sm:mr-8"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-medium">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-sm sm:text-base">
                      {exp.company}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    {exp.desc}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {exp.desc
                        .split(".")
                        .filter((sentence) => sentence.trim())
                        .slice(0, 3)
                        .map((sentence, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm"
                          >
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 mt-1 flex-shrink-0" />
                            <span>{sentence.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                    {[
                      "Angular",
                      "Next.js",
                      ".NET Core",
                      "TypeScript",
                      "REST APIs",
                    ]
                      .slice(0, 4)
                      .map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/80 border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* End of Timeline */}
          <div className="relative mt-8 sm:mt-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20 mx-auto">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
            </div>
            <p className="text-center text-gray-400 mt-3 sm:mt-4 font-medium text-sm sm:text-base">
              More opportunities ahead...
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
            I&apos;m always open to new opportunities and exciting projects.
            Let&apos;s discuss how we can work together!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Let&apos;s Connect
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
