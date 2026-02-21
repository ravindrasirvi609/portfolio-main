"use client";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background relative overflow-x-hidden w-full">
        <Hero />
        <About />
        <Products />
        <CaseStudies />
        <TechStack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
