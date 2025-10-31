"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { socialMedia } from "@/data";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Ravindra Choudhary
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Full-stack developer passionate about creating innovative web
              solutions and building scalable applications with modern
              technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {["About", "Projects", "Experience", "Contact"].map(
                (link, index) => (
                  <li key={link}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      onClick={() => {
                        const element = document.getElementById(
                          link.toLowerCase()
                        );
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {link}
                    </motion.button>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1"
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Get in Touch
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <motion.a
                href="mailto:dev@ravindrachoudhary.in"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">dev@ravindrachoudhary.in</span>
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="pt-3 sm:pt-4">
              <h5 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">
                Follow Me
              </h5>
              <div className="flex space-x-2 sm:space-x-3">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                  >
                    {social.icon === Github ? (
                      <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : social.icon === Linkedin ? (
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6 sm:mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        >
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Ravindra Choudhary. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 fill-current" />
            </motion.div>
            <span className="hidden sm:inline">
              using Next.js & Tailwind CSS
            </span>
            <span className="sm:hidden">Next.js & Tailwind</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
