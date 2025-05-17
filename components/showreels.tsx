"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Showreels() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="showreels" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Showreels</h2>
          <p className="section-subtitle">
            A curated collection of my best video editing work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-lg shadow-xl border-2 border-primary/20"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/YGi96lDiip4?autoplay=1&mute=1&loop=1&playlist=YGi96lDiip4"
            title="Showreel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
