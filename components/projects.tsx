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
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C9javSEBiws/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=AxcRBbvtBiY",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C9Uj_BHhCeO/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/D0QpCWYtGWs",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C9SKX5GBdxo/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=OQqciPB6ctA&sttick=0A",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C89GXLhBLIO/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/Z9W2snWV4Vw",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C8b8zsxhMuK/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/IdY1W0WyBdM",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C76AyPwB2VS/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/bh9UwnFgYhc",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6--eofBpLe/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/Xm-8w__lnQ0",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6nO7xphfRY/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/IwmHCXEswqk",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6d3vGRh3eh/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=ggfD8GtjKFQ",
        },
        {
          title: "Dinar Candy",
          description:
            "Check out the Instagram reel: https://www.instagram.com/dinar_candy/reel/C6LXPtQBcTz/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=wZWaA_zbm18",
        },
        {
          title: "Dinar Candy",
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
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C8QqfG1yQq9/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/3WMR0fm1q-Q",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C75fHILhW4x/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/llS97n0Rpvo",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C7RYYRJBR8t/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=TO9x0LLKGNk",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C7OHiz3RlBk/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/hyFj290Te0o",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C7BFXBQxbDI/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/qzOOmXdfrPI",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C6DqzMDRxWt/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/RHCJaKsvQGk",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C595DsqxZSI/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/AYJ9g1s_GJc",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C5uoWI9RqKA/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/E545P1j6CBE",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C5dTZWpxUra/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/5Pc1fFtuYcg",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C5QoXbyx32R/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/SE9J7c4PI2A",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C5FOaPXB92e/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/qM5gm2rv5LA",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C5AUolWxHo7/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=nXuAZo_eNOg",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C40h2P2ReIN/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/VlmcwbXfK68",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4yGV-VRguJ/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/rY6CqVGQoCg",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4xLz7bxuuW/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/G70p-N4mzfg",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4sy9f1Rdf8/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/cF8t5eI5wJY",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4dNkgZxyQa/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=BAncoHByk4A",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4KIBrxxuIi/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=6iGR6qndi5M",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4Kegu0RpqH/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/kpHzbDfsGOM",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C4C_nOJBN18/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=_-sRff2phWA",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C3-DuoAh8LQ/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=Ih4OtGJp5RQ",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C37QttSRVll/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=AvvTps80aMc",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C3y7gslRFii/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=5D4OzEASPBw",
        },
        {
          title: "Jhon LBF",
          description:
            "Check out the Instagram reel: https://www.instagram.com/jhonlbf/reel/C3xHZs4xTOp/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=U9PK3pbaN-I",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "social",
      label: "KipasKipas",
      projects: [
        {
          title: "TVC KipasKipas 1",
          description: "Menyala untuk Mimpi-Mimpi Anak di Hari Pendidikan.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=0Sm88rXXwLg",
        },
        {
          title: "TVC KipasKipas 2",
          description:
            "Television commercial for KIPASKIPAS mobile app featuring key opinion leaders.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=bfbCy7Rz444",
        },
        {
          title: "COPAS",
          description:
            "COPASCOM 2024 is a Stand Up competition that is here to enliven the world of Stand Up in Indonesia.",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=oxoIykURdfg&t=6708s", // Replace with an actual video URL
        },
        {
          title: "After Movie COPAS",
          description: "After Movie Stand up Cometition (COPAS)",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=bJYkwi3NcPY",
        },
        {
          title: "After Movie OneRun 10k TvOne",
          description:
            "KipasKipas sukses bekerjasama dengan tvOne untuk perhelatan OneRun 10K 2024 di Epicentrum, 26 Mei 2024",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=cI23lFNm4Lk",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "gusmiftah",
      label: "Gus Miftah",
      projects: [
        {
          title: "Gus Miftah",
          description: "https://www.instagram.com/jhonlbf/reel/C4CNzBsBeIB/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=4mVquD2yFCM",
        },
        {
          title: "Gus Miftah",
          description: "https://www.instagram.com/jhonlbf/reel/C3wrRL7LVds/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=WoXc3WM1OBA", // Replace with an actual video URL
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "pinusi",
      label: "Pinusidotcom",
      projects: [
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=FnJ_bdYyYcY",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=X3nglGKIN_8",
        },
        {
          title: "PINUSI",
          description:
            "https://www.instagram.com/pinusidotcom/reel/C5A089VpOQ2/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=cPLAg6RvSUM",
        },
        {
          title: "PINUSI", // ini
          description:
            "https://www.instagram.com/pinusidotcom/reel/C1JQAjhptx0/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=VG27P2TsthI",
        },
        {
          title: "PINUSI", // ini 2
          description:
            "https://www.instagram.com/pinusidotcom/reel/C1B1lOdrDyi/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=-Vr_vg6bSOo",
        },
        {
          title: "PINUSI", // ini 3
          description:
            "https://www.instagram.com/pinusidotcom/reel/C0v0X0RrSDm/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=pBfeCacGp74",
        },
        {
          title: "PINUSI", // ini 4
          description:
            "https://www.instagram.com/pinusidotcom/reel/C0tRnXhrsJw/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=C01DSuRk9Uk",
        },
        {
          title: "PINUSI", // ini 5
          description:
            "https://www.instagram.com/pinusidotcom/reel/C0iVrozJ5B4/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=j8AmV5l_8iA",
        },
        {
          title: "PINUSI", // ini 6
          description:
            "https://www.instagram.com/pinusidotcom/reel/C0a5QQurRKm/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=KzOs6ignGHY",
        },
        {
          title: "PINUSI", // ini 7
          description:
            "https://www.instagram.com/pinusidotcom/reel/C0a5QQurRKm/",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=CSvwpH62lVk",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=iBE7HGcl-H4",
        }, // ini
        {
          title: "KEDAI PINTAR",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=U7DD9_58xXY",
        },
        {
          title: "KEDAI PINTAR",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=XIQPSlYaz68",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=aGOxiC2K9yM",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=Yv8g4KWR9Ss",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=zlDsFZFk0xE",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=CTF9OaZ8QI0",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=SCrEL4hiB1k",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=Af426yv2coA",
        },
        {
          title: "PINUSI",
          description: "Check out the video",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=KlzprvMrI0Y",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "gaia",
      label: "Gaia Creative Nusantara",
      projects: [
        {
          title: "GAIA",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "#",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "bri",
      label: "BRI",
      projects: [
        {
          title: "BRI",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/SGVgG8qVK5M",
        },
        {
          title: "BIT",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/A9L_Irs7Cng",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "bawaslu",
      label: "BAWASLU",
      projects: [
        {
          title: "BAWASLU",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://www.youtube.com/watch?v=vDhqUYNCgQE&t=2222s&pp=ygUXYmF3YXNsdSBkZWJhdCBtYWhhc2lzd2E%3D",
        },
        {
          title: "ASSET BAWASLU",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/hRPddVe7fb0",
        },
        {
          title: "ASSET BAWASLU",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/gbUZBqD_sQQ",
        },
        {
          title: "ASSET BAWASLU",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/kwK2LvUlSRU",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "mans",
      label: "Mansuri MANS",
      projects: [
        {
          title: "MANSURIMANS",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl:
            "https://www.youtube.com/watch?v=vDhqUYNCgQE&t=2222s&pp=ygUXYmF3YXNsdSBkZWJhdCBtYWhhc2lzd2E%3D",
        },
        {
          title: "MANSURIMANS",
          description: "Watch Here",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://youtu.be/hRPddVe7fb0",
        },
        // Tambahkan lebih banyak proyek jika diperlukan
      ],
    },
    {
      id: "laksdya",
      label: "Laksdya DR. irvansyah",
      projects: [
        {
          title: "DR. irvansyah",
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7452674666822388998?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=J-1xUljaVOw",
        },
        {
          title: "DR. irvansyah",
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7456760671540120839?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=eexDTBlJnX4",
        },
        {
          title: "DR. irvansyah",
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7457110366233890066?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=EKn82BJbaLE",
        },
        {
          title: "DR. irvansyah",
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7457460774764612882?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=METjO89Q9YE",
        },
        {
          title: "DR. irvansyah",
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7457845337059888392?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=u4q65UQsI0Y",
        },
        {
          title: "DR. irvansyah",
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7458210535620791559?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=SqRLL5YTeTI",
        },
        {
          title: "DR. irvansyah", // 7
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7460434253927517458?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=OyEGXmhoN-g",
        },
        {
          title: "DR. irvansyah", // 8
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7458978904116595975?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=HJoMWrj4hDc",
        },
        {
          title: "DR. irvansyah", // 9
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7461596479593958674?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=_Tdp1jAxz2w",
        },
        {
          title: "DR. irvansyah", // 10
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7462286235713801479?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=phxoImxcXkE",
        },
        {
          title: "DR. irvansyah", // 11
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7465668635672022279?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=SZQHOxQdsEk",
        },
        {
          title: "DR. irvansyah", // 12
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7465978037931166983?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=r7ZXYw4AagA",
        },
        {
          title: "DR. irvansyah", // 13
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7467528793767398664?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=JHgQQOiOTtw",
        },
        {
          title: "DR. irvansyah", // 14
          description:
            "https://www.tiktok.com/@laksdya.dr.irvansyah/video/7468255755876027655?is_from_webapp=1&sender_device=pc&web_id=7507261141534852616",
          image: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://www.youtube.com/watch?v=jTI7jSm2aD0",
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

        {/* <div className="text-center mt-12">
          <Button asChild variant="outline" className="gap-2">
            <a href="#" target="_blank" rel="noopener noreferrer">
              View All Projects
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div> */}
      </div>
    </section>
  );
}
