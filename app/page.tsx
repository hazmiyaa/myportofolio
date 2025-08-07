import type { Metadata } from "next";
import Hero from "@/components/hero";
import About from "@/components/about";
import Showreels from "@/components/showreels";
// import Experience from "@/components/experience";
import Projects from "@/components/projects";
// import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Dicky Hazmi Bahrain | Video Editor & Content Creator",
  description:
    "Professional portfolio of Dicky Hazmi Bahrain, a video editor and content creator with experience in corporate and social media content.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Showreels />
      {/* <Skills /> */}
      {/* <Experience /> */}
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
