"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

const images = [
  "https://drive.google.com/uc?export=view&id=1AHVWzGvpKlCIbjQ7jfRLXR2zR881FW7Y",
  "https://drive.google.com/uc?export=view&id=1SwsgUgZ6QbkLBcJDt8wZ3yNqpGncd97H",
  "https://drive.google.com/uc?export=view&id=1DCn_JlTTuJl9taE1mx0yy5i5YzVsd3C-",
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Ganti gambar setiap 4 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Learn more about my background, education, and passion for video
            editing and content creation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className={`grid md:grid-cols-2 gap-12 ${
            isMobile ? "flex flex-col-reverse" : ""
          } items-center`}
        >
          <div className="bg-card p-8 rounded-lg border border-border/50 shadow-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground mb-6"
            >
              Communications and Advertising graduate from University of
              Muhammadiyah Jakarta with 5 years of experience in video editing.
              I've worked with several corporate clients and as a freelancer,
              bringing creative vision to life through compelling visual
              storytelling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-muted-foreground mb-6"
            >
              I have experience working both as part of a team and individually,
              specializing in video editing, motion graphics, and videography.
              My academic background combined with hands-on experience allows me
              to create content that effectively communicates messages and
              engages audiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Location
                </h3>
                <p className="text-muted-foreground">
                  Pamulang, Tangerang Selatan
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Education
                </h3>
                <p className="text-muted-foreground">
                  Bachelor in Communications
                </p>
              </div>
              {/* <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">GPA</h3>
                <p className="text-muted-foreground">3.42/4.00</p>
              </div> */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Experience
                </h3>
                <p className="text-muted-foreground">5+ Years</p>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg -z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10" />
            <div className="relative overflow-hidden rounded-lg shadow-xl border-2 border-primary/20 w-full h-auto">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={images[currentImage]}
                  alt={`Slideshow Image ${currentImage + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
