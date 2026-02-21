"use client";
import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Clock,
  MessageCircle,
  ArrowRight,
  Star,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactMethod {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  color: "cyan" | "emerald" | "purple";
  action: (() => void) | null;
}

type ColorClasses = {
  [K in ContactMethod["color"]]: string;
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const phoneNumber: string = "8107199052";
  const whatsappUrl: string = `https://wa.me/${phoneNumber}`;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({ ...prev, [name]: "" }));
    }
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      title: "Email",
      value: "dev@ravindrachoudhary.in",
      description: "Get a response within 24 hours",
      color: "cyan",
      action: (): void => {
        if (typeof window !== "undefined") {
          window.open("mailto:dev@ravindrachoudhary.in");
        }
      },
    },
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      value: `+91 ${phoneNumber}`,
      description: "Available Mon-Fri, 9AM-6PM IST",
      color: "emerald",
      action: (): void => {
        if (typeof window !== "undefined") {
          window.open(whatsappUrl, "_blank");
        }
      },
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Pune, Maharashtra",
      description: "Available for local meetings",
      color: "purple",
      action: null,
    },
  ];

  const colorClasses: ColorClasses = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white",
  };

  const handleWhatsAppClick = (): void => {
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="contact" className="relative bg-[#050505] min-h-screen py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-emerald-400 mb-6 uppercase tracking-widest shadow-lg">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             Available for new projects
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter mix-blend-difference mb-6">
            Let&apos;s Create Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Amazing</span>
          </h2>
          <p className="text-lg text-gray-400 font-light">
            Ready to transform your ideas into reality? I&apos;m here to help you build exceptional digital experiences that scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Methods */}
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Get In Touch
              </h3>
              <p className="text-gray-400 text-base sm:text-lg font-light">
                Choose your preferred way to reach out. Always excited to discuss new tech.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method: ContactMethod, index: number) => {
                const Icon: LucideIcon = method.icon;

                return (
                  <div
                    key={index}
                    className={`group p-5 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 ${
                      method.action ? "cursor-pointer hover:-translate-y-1" : ""
                    }`}
                    onClick={method.action || undefined}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                          colorClasses[method.color]
                        }`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-1">
                          {method.title}
                        </h4>
                        <p className="text-gray-300 font-medium mb-1 text-sm sm:text-base break-words">
                          {method.value}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm font-light">
                          {method.description}
                        </p>
                      </div>
                      {method.action && (
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mt-4" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-900/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 text-white text-center sm:text-left flex flex-col sm:flex-row items-center gap-4 group">
               <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-black" />
               </div>
               <div className="flex-1">
                  <h4 className="text-lg font-bold text-white">Instant Contact</h4>
                  <p className="text-emerald-300/80 text-sm font-light">Send a message directly to my WhatsApp</p>
               </div>
               <button
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-full text-sm font-bold transition-colors duration-300"
                  type="button"
               >
                  Chat Now
               </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden relative"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
            <div className="p-6 sm:p-8 border-b border-white/5">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-gray-400 text-sm font-light">
                Fill out the form below and I'll get back to you shortly.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">
                    Message Sent!
                  </h4>
                  <p className="text-gray-400 font-light">
                    Thank you for reaching out. I'll review your details and respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 text-white bg-black/50 border rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all duration-300 ${
                          errors.name
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-2">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 text-white bg-black/50 border rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all duration-300 ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-2">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 text-white bg-black/50 border rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all duration-300 ${
                        errors.subject
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10"
                      }`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-2">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 text-white bg-black/50 border rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all duration-300 resize-none ${
                        errors.message
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10"
                      }`}
                      placeholder="Tell me about your project goals and timeline..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-2">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-xl bg-white text-black font-semibold py-4 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                       {isSubmitting ? (
                          <>
                             <Clock className="w-5 h-5 animate-spin" />
                             Processing...
                          </>
                       ) : (
                          <>
                             Send Message
                             <Send className="w-4 h-4 ml-1" />
                          </>
                       )}
                    </span>
                  </button>
                  
                  <p className="text-center text-xs text-gray-500 font-light mt-4">
                     All fields are strictly confidential.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
