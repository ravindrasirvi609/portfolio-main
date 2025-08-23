"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { workExperience } from "@/data";
import { Award, Calendar, MapPin, ArrowRight } from "lucide-react";

export const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  return (
    <section id="experience" className="relative min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div style={{ scale }} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent" />

          <div className="space-y-12">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  {/* Connection Line */}
                  <div
                    className={`absolute top-8 w-8 h-0.5 bg-gradient-to-r ${
                      index % 2 === 0
                        ? "left-16 from-cyan-400 to-transparent"
                        : "right-16 from-transparent to-purple-500"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className={`flex-1 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 ${
                    index % 2 === 0 ? "ml-8" : "mr-8"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 font-semibold">
                      {exp.company}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {exp.desc}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {exp.desc
                        .split(".")
                        .filter((sentence) => sentence.trim())
                        .map((sentence, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-slate-300 text-sm"
                          >
                            <ArrowRight className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" />
                            <span>{sentence.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                    {[
                      "Angular",
                      "Next.js",
                      ".NET Core",
                      "TypeScript",
                      "REST APIs",
                    ].map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
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
          <div className="relative mt-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20 mx-auto">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <p className="text-center text-gray-400 mt-4 font-medium">
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
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I&apos;m always open to new opportunities and exciting projects.
            Let&apos;s discuss how we can work together!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Let&apos;s Connect
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
