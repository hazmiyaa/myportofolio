"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Film, Scissors, Layers, Camera, Users, Lightbulb } from "lucide-react"

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    {
      name: "Video Editing",
      icon: <Scissors className="h-8 w-8" />,
      description: "Professional video editing with attention to detail and storytelling.",
      level: 95,
    },
    {
      name: "Motion Graphics",
      icon: <Layers className="h-8 w-8" />,
      description: "Creating engaging animations and visual effects to enhance video content.",
      level: 85,
    },
    {
      name: "Videography",
      icon: <Camera className="h-8 w-8" />,
      description: "Capturing high-quality footage with proper framing and composition.",
      level: 80,
    },
    {
      name: "Content Creation",
      icon: <Film className="h-8 w-8" />,
      description: "Developing engaging content for various platforms and audiences.",
      level: 75,
    },
    {
      name: "Teamwork",
      icon: <Users className="h-8 w-8" />,
      description: "Collaborating effectively with teams to achieve project goals.",
      level: 80,
    },
    {
      name: "Creative Thinking",
      icon: <Lightbulb className="h-8 w-8" />,
      description: "Generating innovative ideas and solutions for visual storytelling.",
      level: 75,
    },
  ]

  return (
    <section id="skills" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">
            Professional capabilities I've developed throughout my career in video editing and content creation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="service-card"
            >
              <div className="text-primary mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{skill.name}</h3>
              <p className="text-muted-foreground mb-4">{skill.description}</p>
              <div className="skill-progress-bar">
                <motion.div
                  className="skill-progress-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
              <div className="skill-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
