"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/data";
import { Zap, Palette, Users } from "lucide-react";

export const About = () => {
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0.15, 0.35], [0, 360]);
  const x = useTransform(scrollYProgress, [0.15, 0.35], ["-100%", "0%"]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ rotateY, x }}
        className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center px-6"
      >
        {/* Left */}
        <div className="space-y-6">
          {[
            {
              Icon: Zap,
              title: "Performance Focused",
              desc: "Lightning-fast apps",
            },
            {
              Icon: Palette,
              title: "Design Excellence",
              desc: "Beautiful UIs",
            },
            { Icon: Users, title: "Collaborative", desc: "Team synergy" },
          ].map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl"
            >
              <Icon className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-slate-300">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right - Skills */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">
            Skills & Expertise
          </h3>
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: idx * 0.1 }}
            >
              <div className="flex justify-between text-white">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                <motion.div
                  className="h-2 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
