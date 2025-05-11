"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import Typewriter from "@/components/typewriter";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-8 overflow-hidden bg-gradient-to-br from-background to-secondary dark:from-background dark:to-secondary"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background/50 to-secondary/50 opacity-90"></div>
      </div>

      <div className="container relative z-20 px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-muted-foreground mb-4"
            >
              Welcome To My Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Hi I am{" "}
              <span className="text-primary">
                <Typewriter
                  text="Dicky Hazmi Bahrain"
                  delay={100}
                  infinite={true}
                />
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl lg:text-2xl font-medium text-muted-foreground mb-6"
            >
              Video Editor & Content Creator
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground mb-8 max-w-lg"
            >
              Communications and Advertising graduate with 5 years of experience
              in video editing, bringing creative vision to life through
              compelling visual storytelling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="#portfolio">View My Work</Link>
              </Button>
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                variant="outline"
              >
                <Link href="#contact">Contact Me</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 mt-8"
            >
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden md:flex justify-center items-center"
          >
            <div className="relative">
              {/* Outer circle/stroke */}
              <div className="absolute inset-0 rounded-full border-4 border-primary transform scale-110 -z-10"></div>

              {/* Circular image container */}
              <div className="w-80 h-80 overflow-hidden rounded-full border-2 border-muted shadow-xl">
                <Image
                  src="https://drive.google.com/uc?export=view&id=1DCn_JlTTuJl9taE1mx0yy5i5YzVsd3C-"
                  alt="Dicky Hazmi Bahrain"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Experience badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
                <span className="font-bold">5+ Years</span>
                <span className="block text-sm text-center">Experience</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-primary hover:bg-transparent animate-bounce"
          onClick={() => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <ChevronDown className="h-8 w-8" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </motion.div>
    </section>
  );
}
