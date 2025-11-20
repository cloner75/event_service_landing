"use client";

import { useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function FooterBackground() {
  // Friends images from public/images/friends
  const images = [
    "/images/friends/1.jpg",
    "/images/friends/2.jpg",
    "/images/friends/3.jpg",
    "/images/friends/4.jpg",
    "/images/friends/5.jpg",
  ];

  const { scrollYProgress } = useScroll();

  // Map scroll progress 0→1 → image index 0→last
  const index = useTransform(scrollYProgress, [0, 1], [0, images.length - 1], {
    ease: (t) => 1 - Math.pow(1 - t, 3), // slows down near bottom
  });

  const [bg, setBg] = useState(images[0]);

  useEffect(() => {
    const unsub = index.on("change", (i) => {
      setBg(images[Math.round(i)]);
    });

    return () => unsub();
  }, [index]);

  return (
    <div
      className="h-screen w-full bg-cover bg-center transition-all duration-75"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    />
  );
}
