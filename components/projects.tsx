"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

// Utility function to get video thumbnails from various platforms
const getVideoThumbnail = (url: string) => {
  if (!url || url === "#") return "/placeholder.svg?height=720&width=1280";

  try {
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtube.com")
        ? url.split("v=")[1]?.split("&")[0]
        : url.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    // For TikTok and Instagram, we can't directly get thumbnails via URL
    // We would need to use their APIs, which requires authentication
    // For now, we'll return a placeholder for these platforms
    if (url.includes("tiktok.com") || url.includes("instagram.com")) {
      return "/placeholder.svg?height=720&width=1280";
    }

    return "/placeholder.svg?height=720&width=1280";
  } catch (error) {
    console.error("Error getting video thumbnail:", error);
    return "/placeholder.svg?height=720&width=1280";
  }
};

const linkifyText = (text: string) => {
  if (!text) return text;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  const parts = text.split(urlRegex);

  const result = [];
  let urlIndex = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Jika ini adalah URL, skip tampilkan teksnya dan ganti dengan tombol
    if (part.match(urlRegex)) {
      const url = urls[urlIndex++];
      const isInstagram = url.includes("instagram.com");
      const isTikTok = url.includes("tiktok.com");
      const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");

      let buttonText = "Click here";
      if (isInstagram) buttonText = "View on Instagram";
      else if (isTikTok) buttonText = "View on TikTok";
      else if (isYoutube) buttonText = "View on YouTube";

      result.push(
        <a
          key={`link-${i}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium hover:bg-primary/20 transition-colors ml-1 mr-1"
        >
          {isInstagram && <span className="text-xs">📸</span>}
          {isTikTok && <span className="text-xs">🎵</span>}
          {isYoutube && <span className="text-xs">▶️</span>}
          {!isInstagram && !isTikTok && !isYoutube && (
            <span className="text-xs">🔗</span>
          )}
          {buttonText}
        </a>
      );
    } else if (part) {
      // Tampilkan bagian teks biasa (bukan URL)
      result.push(<span key={`text-${i}`}>{part}</span>);
    }
  }

  return result;
};

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectCategories = [
    {
      id: "corporate",
      label: "Dinar Candy",
      projects: [
        {
          title: "Dinar Candy : Rumah Singgah",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C9javSEBiws/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=AxcRBbvtBiY",
        },
        {
          title: "Dinar Candy : Rumah Singgah",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C9Uj_BHhCeO/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/D0QpCWYtGWs",
        },
        {
          title: "Dinar Candy : Dinar vs Cupi Cupita",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C9SKX5GBdxo/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=OQqciPB6ctA&sttick=0A",
        },
        {
          title: "Dinar Candy : Make up",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C89GXLhBLIO/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/Z9W2snWV4Vw",
        },
        {
          title: "Dinar Candy : Dimsum",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C8b8zsxhMuK/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/IdY1W0WyBdM",
        },
        {
          title: "Dinar Candy : Bakso lava mercon",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/bh9UwnFgYhc",
        },
        {
          title: "Dinar Candy : Panti Asuhan",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6--eofBpLe/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/Xm-8w__lnQ0",
        },
        {
          title: "Dinar Candy : Beli mainan",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6nO7xphfRY/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/IwmHCXEswqk",
        },
        {
          title: "Dinar Candy : Bagi bagi Candy (BBC)",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6d3vGRh3eh/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=ggfD8GtjKFQ",
        },
        {
          title: "Dinar Candy : Donasi KipasKipas",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6LXPtQBcTz/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=wZWaA_zbm18",
        },
        {
          title: "Dinar Candy : HSS 5",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C58QhKjBuQC/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=224WYYsZYCo",
        },
      ],
    },
    {
      id: "jhonlbf",
      label: "Jhon LBF",
      projects: [
        {
          title: "Jhon LBF : Sumbang Sapi 1",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C8QqfG1yQq9/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/3WMR0fm1q-Q",
        },
        {
          title: "Jhon LBF : Sumbang Sapi 2",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C75fHILhW4x/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/llS97n0Rpvo",
        },
        {
          title: "Jhon LBF : Giveaway KipasKipas",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C7RYYRJBR8t/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=TO9x0LLKGNk",
        },
        {
          title: "Jhon LBF : Donasi ke Veteran Indonesia",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C7OHiz3RlBk/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/hyFj290Te0o",
        },
        {
          title: "Jhon LBF : Donasi ke Masjid",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C7BFXBQxbDI/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/qzOOmXdfrPI",
        },
        {
          title: "Jhon LBF : Donasi ke Vihara",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C6DqzMDRxWt/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/RHCJaKsvQGk",
        },
        {
          title: "Jhon LBF : Donasi",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C595DsqxZSI/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/AYJ9g1s_GJc",
        },
        {
          title: "Jhon LBF : Donasi Yayasan",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C5uoWI9RqKA/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/E545P1j6CBE",
        },
        {
          title: "9",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "10",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "11",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "12",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "13",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "14",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "15",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "16",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "17",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "18",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "19",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "20",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "21",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "22",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "23",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "24",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "25",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        {
          title: "26",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://drive.google.com/file/d/1H5ImQKNJ2qCw0UaPgIAr4R0hJRm2aLek/preview",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "social",
      label: "KipasKipas",
      projects: [
        {
          title:
            "KipasKipas: Menyala untuk Mimpi-Mimpi Anak di Hari Pendidikan",
          description: "Menyala untuk Mimpi-Mimpi Anak di Hari Pendidikan.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=0Sm88rXXwLg",
        },
        {
          title: "KipasKipas: A day in my Life",
          description:
            "Television commercial for KIPASKIPAS mobile app featuring key opinion leaders.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=bfbCy7Rz444",
        },
        {
          title: "COPAS (Comedy KipasKipas)",
          description:
            "COPASCOM 2024 is a Stand Up competition that is here to enliven the world of Stand Up in Indonesia.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=oxoIykURdfg&t=6708s", // Replace with an actual video URL
        },
        {
          title: "After Movie COPAS (Comedy KipasKipas",
          description: "After Movie Stand up Cometition (COPAS)",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=bJYkwi3NcPY",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "events",
      label: "Pinusidotcom",
      projects: [
        {
          title: "ICORCOM 2021",
          description:
            "Teaser and awarding videos for the International Conference on Research in Communication and Media.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "#",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(projectCategories[0].id);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Menampilkan 6 video per halaman

  // Get active projects based on current category
  const activeProjects =
    projectCategories.find((category) => category.id === activeCategory)
      ?.projects || [];

  // Calculate total pages
  const totalPages = Math.ceil(activeProjects.length / itemsPerPage);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(0); // Reset to first page when changing categories
  }, []);

  // Get current page projects
  const getCurrentPageProjects = useCallback(() => {
    const startIndex = currentPage * itemsPerPage;
    return activeProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [activeProjects, currentPage, itemsPerPage]);

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  // Current projects to display
  const currentProjects = getCurrentPageProjects();

  return (
    <section id="portfolio" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">
            A showcase of my video editing and content creation work across
            various projects and industries.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              className={activeCategory === category.id ? "bg-primary" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={`${activeCategory}-${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="portfolio-item group relative overflow-hidden rounded-lg aspect-video"
                >
                  <img
                    src={
                      getVideoThumbnail(project.videoUrl) || "/placeholder.svg"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="portfolio-overlay absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4">
                    <h3 className="text-balance font-bold text-white mb">
                      {project.title}
                    </h3>
                    <p className="text-white/80 mb-1 text-sm text-center line-clamp-2">
                      {linkifyText(project.description)}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-white text-primary hover:bg-white/90"
                        >
                          <Play className="h-4 w-4 mr-2" /> Watch Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogDescription>
                            {linkifyText(project.description)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          {project.videoUrl && (
                            <>
                              {project.videoUrl.includes("tiktok.com") ? (
                                <iframe
                                  src={`https://www.tiktok.com/embed/v2/${
                                    project.videoUrl
                                      .split("/video/")[1]
                                      ?.split("?")[0]
                                  }`}
                                  width="100%"
                                  height="100%"
                                  allow="autoplay; encrypted-media"
                                  allowFullScreen
                                  className="rounded-lg w-full h-full"
                                />
                              ) : project.videoUrl.includes("instagram.com") ? (
                                <iframe
                                  src={`${project.videoUrl}embed`}
                                  width="100%"
                                  height="100%"
                                  allow="autoplay; encrypted-media"
                                  allowFullScreen
                                  className="rounded-lg w-full h-full"
                                />
                              ) : project.videoUrl.includes(
                                  "drive.google.com"
                                ) ? (
                                <iframe
                                  src={project.videoUrl.replace(
                                    "/view",
                                    "/preview"
                                  )}
                                  width="100%"
                                  height="100%"
                                  allow="autoplay"
                                  allowFullScreen
                                  className="rounded-lg w-full h-full"
                                />
                              ) : (
                                <ReactPlayer
                                  url={project.videoUrl}
                                  controls
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous page</span>
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={`page-${index}`}
                    variant={currentPage === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(index)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === index ? "bg-primary" : ""
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="gap-2">
            <a href="#" target="_blank" rel="noopener noreferrer">
              View All Projects
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
