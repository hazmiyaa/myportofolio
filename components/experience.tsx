"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState("biography");

  const experiences = [
    {
      company: "PT. Gaia Creative Nusantara",
      position: "Video Editor & Content Creator",
      period: "December 2024 - Present",
      description:
        "Creating social media marketing content, managing content for the Indonesian Maritime Security Agency (Bakamla RI), and producing various TikTok and Instagram content.",
      projects: [
        "Social Media Marketing for @gaiacreative.nusantara",
        "Content for @laksdya.dr.irvansyah on TikTok/Instagram",
        "Content MCN (Multi-Channel Network)",
      ],
    },
    {
      company: "PT. Portal Media Nusantara",
      position: "Video Editor",
      period: "October 2023 - August 2024",
      description:
        "Worked on various content for PINUSI.COM including podcasts and short-form video content.",
      projects: [
        "PINEWSI Podcast",
        "Short video content (PINHUB, PIN ENTERTAIN, PIN EXPLAIN)",
        "News short videos",
        "PIN-ENTERTAIN mini podcasts featuring artists and musicians",
      ],
    },
    {
      company: "PT. Komunitas Anak Bangsa",
      position: "Video Editor & Camera Person",
      period: "October 2023 - September 2024",
      description:
        "Created promotional and advertising content for KIPASKIPAS mobile app, including TVC, motion graphics, and event coverage.",
      projects: [
        "TVC KoL For KIPASKIPAS (TikTok, Instagram)",
        "TVC KIPASKIPAS A Day in My Life",
        "TVC KIPASKIPAS Hari Pendidikan",
        "Motion Graphics for StandUp Comedy KipasKipas",
      ],
    },
    {
      company: "UNICEF - Children Capability & KEMENSOS",
      position: "Intern",
      period: "May 2019 - November 2019",
      description:
        "Created high-quality video content for UNICEF campaigns focused on children's capabilities.",
      projects: [
        "Video content for UNICEF campaigns",
        "Children Capability themed videos for UNICEF and Kemensos",
      ],
    },
    {
      company: "PROJECTS",
      position: "Video Editor",
      period: "May 2018 - November 2024",
      description: "Created high-quality video content",
      projects: [
        "Greetings Birthday for BIT to DAPEN BRI",
        "Children Capability themed videos for UNICEF and Kemensos",
        "Making Teaser and Awarding for International Conference on Research in Communication and Media (ICORCOM 2021)",
        "Editing Mapping, and Campers Wisuda Online UMJ 2021",
        "Commite and Editor for PKKMB UMJ 2019 - 2021",
        "Graphic Editing Video Borang Akreditasi & K3L FEB UMJ",
        "Work for BAWASLU As Editor and Motion Graphic Designer (Kompetisi Debat Se-Indonesia Tahun 2022)",
        "Company Profile, Aulia School, PCIM Mesir, FISIP UMJ 2024",
        "Youtube Editor “Coding with Charisma” “Alnay by ika“",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor in Communications",
      institution: "University of Muhammadiyah Jakarta",
      period: "2015 - 2019",
      description:
        "Graduated with a GPA of 3.45/4.00, specializing in Advertising and Media Communications.",
    },
    {
      degree: "Certificate in Digital Media Production",
      institution: "Media Training Institute",
      period: "2018",
      description:
        "Intensive training in digital media production, video editing, and motion graphics.",
    },
  ];

  const skills = [
    { name: "Adobe Premiere Pro", level: 95 },
    { name: "Capcut", level: 85 },
    { name: "Adobe After Effects", level: 85 },
    { name: "Canva", level: 85 },
    { name: "Adobe Photoshop", level: 85 },
    { name: "Adobe Illustrator", level: 65 },
  ];

  return (
    <section id="experience" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">My Resume</h2>
          <p className="section-subtitle">
            My professional journey in video editing and content creation across
            various organizations.
          </p>
        </motion.div>

        <div className="bg-card rounded-lg shadow-lg p-6 border border-border/50">
          <div className="resume-tabs">
            <button
              type="button"
              className={`resume-tab ${
                activeTab === "biography" ? "active" : ""
              }`}
              onClick={() => setActiveTab("biography")}
            >
              <span className="mr-2">01</span> BIOGRAPHY
            </button>
            <button
              type="button"
              className={`resume-tab ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              <span className="mr-2">02</span> SKILLS
            </button>
            <button
              type="button"
              className={`resume-tab ${
                activeTab === "education" ? "active" : ""
              }`}
              onClick={() => setActiveTab("education")}
            >
              <span className="mr-2">03</span> EDUCATION
            </button>
          </div>

          {activeTab === "biography" && (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-muted/30 p-6 rounded-lg border border-border/30"
                >
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                    </div>
                    <div className="flex items-center text-muted-foreground gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {exp.position}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {exp.description}
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-semibold">Key Projects:</h5>
                    <ul className="space-y-1">
                      {exp.projects.map((project, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">
                            {project}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <motion.div
                      className="skill-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-muted/30 p-6 rounded-lg border border-border/30"
                >
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <div className="flex items-center text-muted-foreground gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {edu.institution}
                  </h4>
                  <p className="text-muted-foreground">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
