"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { workExperience } from "@/data";
import { Award } from "lucide-react";

export const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <motion.div style={{ scale }} className="w-full max-w-5xl px-6">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
          Work Experience
        </h2>
        <div className="space-y-12">
          {workExperience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                <p className="text-cyan-300">{exp.company}</p>
                <p className="text-slate-300">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
