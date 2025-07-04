import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { GitHubContributions } from "@/components/sections/GitHubContributions";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <div id="github">
        <GitHubContributions />
      </div>
      <Testimonials />
      <Contact />
    </main>
  );
}
