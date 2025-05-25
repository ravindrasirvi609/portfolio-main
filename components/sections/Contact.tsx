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
  color: "blue" | "green" | "purple";
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
      color: "blue",
      action: (): void => {
        if (typeof window !== "undefined") {
          window.open("mailto:dev@ravindrachoudhary.in");
        }
      },
    },
    {
      icon: Phone,
      title: "Phone",
      value: `+91 ${phoneNumber}`,
      description: "Available Mon-Fri, 9AM-6PM IST",
      color: "green",
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
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green:
      "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    purple:
      "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  };

  const handleWhatsAppClick = (): void => {
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative px-4 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-slate-600 mb-6 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Let&apos;s Create Something
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Amazing Together
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your ideas into reality? I&apos;m here to help
              you build exceptional digital experiences that make a difference.
            </p>

            <div className="flex items-center justify-center gap-1 mt-8">
              {Array.from({ length: 5 }, (_, i: number) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm text-slate-600">
                Trusted by 10+ clients worldwide
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-slate-600 text-lg">
                Choose your preferred way to reach out. I&apos;m always excited
                to discuss new opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method: ContactMethod, index: number) => {
                const Icon: LucideIcon = method.icon;

                return (
                  <div
                    key={index}
                    className={`group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 ${
                      method.action ? "cursor-pointer hover:scale-105" : ""
                    }`}
                    onClick={method.action || undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          colorClasses[method.color]
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">
                          {method.title}
                        </h3>
                        <p className="text-slate-900 font-medium mb-1">
                          {method.value}
                        </p>
                        <p className="text-slate-600 text-sm">
                          {method.description}
                        </p>
                      </div>
                      {method.action && (
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Quick Response</h3>
                  <p className="text-green-100 text-sm">
                    Get instant replies on WhatsApp
                  </p>
                </div>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors duration-300 backdrop-blur-sm"
                  type="button"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-blue-100">
                Tell me about your project and let&apos;s make it happen
              </p>
            </div>

            <div className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600">
                    Thank you for reaching out. I&apos;ll get back to you within
                    24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6" onClick={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 ${
                          errors.name
                            ? "border-red-300 focus:border-red-500"
                            : "border-slate-200"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-slate-200"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 ${
                        errors.subject
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="Web Development Project"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none bg-white/50 ${
                        errors.message
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="Tell me about your project goals, timeline, and any specific requirements..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple hover:from-blue-700 hover:to-purple text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-5 h-5 animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send className="w-5 h-5" />
                        Send Message
                      </div>
                    )}
                  </button>

                  <p className="text-center text-sm text-slate-500">
                    * Required fields. Your information is safe and will never
                    be shared.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response Time Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700 font-medium">
              Average response time: 2-4 hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
