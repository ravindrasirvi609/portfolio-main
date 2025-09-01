"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/data";
import {
  Zap,
  Palette,
  Users,
  Code,
  Database,
  Wrench,
  GraduationCap,
  Clock,
} from "lucide-react";
import Image from "next/image";

export const About = () => {
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0.05, 0.25], [0, 360]);
  const x = useTransform(scrollYProgress, [0.05, 0.25], ["-100%", "0%"]);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      skills: ["Angular", "Next.js / React", "TypeScript / JavaScript"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend",
      icon: Database,
      skills: [".NET Core", "GraphQL", "REST API Design"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Tools & Others",
      icon: Wrench,
      skills: ["PWA & Push Notifications", "MySQL", "Agile / Git / CI-CD"],
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate full-stack developer with expertise in modern web
            technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Personal Info & Highlights */}
          <motion.div style={{ rotateY, x }} className="space-y-8">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-80 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Image
                  src="/ravindra.jpeg"
                  alt="Ravindra Choudhary"
                  fill
                  className="object-cover rounded-full border-4 border-white/20"
                />
              </div>
            </motion.div>

            {/* Personal Highlights */}
            <div className="space-y-6">
              {[
                {
                  Icon: GraduationCap,
                  title: "Education",
                  desc: "Computer Science Graduate",
                  color: "text-blue-400",
                },
                {
                  Icon: Clock,
                  title: "Experience",
                  desc: "3+ Years in Software Development",
                  color: "text-purple-400",
                },
                {
                  Icon: Users,
                  title: "Collaboration",
                  desc: "Team-oriented developer",
                  color: "text-green-400",
                },
              ].map(({ Icon, title, desc, color }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <Icon className={`w-8 h-8 ${color}`} />
                  <div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-slate-300">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Skills & Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Skills & Expertise
            </h3>

            {/* Skill Categories */}
            <div className="space-y-6">
              {skillCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">
                        {category.title}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skillName, skillIndex) => {
                        const skill = skills.find((s) => s.name === skillName);
                        if (!skill) return null;

                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: "100%" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between text-white text-sm">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-gray-300">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1.5,
                                  delay:
                                    categoryIndex * 0.2 +
                                    skillIndex * 0.1 +
                                    0.3,
                                }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {[
                {
                  Icon: Zap,
                  title: "Performance",
                  desc: "Lightning-fast apps",
                  color: "text-yellow-400",
                },
                {
                  Icon: Palette,
                  title: "Design",
                  desc: "Beautiful UIs",
                  color: "text-pink-400",
                },
              ].map(({ Icon, title, desc, color }) => (
                <div
                  key={title}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                >
                  <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                  <h4 className="text-white font-semibold">{title}</h4>
                  <p className="text-slate-300 text-sm">{desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
