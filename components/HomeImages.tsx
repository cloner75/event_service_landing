"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CardWithPins from "./CardWithPins";
import CenterImage from "./CenterImage";

const CENTER_IMAGE_MODE = "video"; // 'video' or 'card'

export default function HomeImages() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-300px 0px" });

  // Play video when in view
  if (CENTER_IMAGE_MODE === "video" && videoRef.current) {
    if (isInView && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else if (!isInView && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }

  // Slide-in animations
  const sideVariantsLeft = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const sideVariantsRight = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Tilt hover animation
  const tiltLeft = {
    rotate: -4,
    scale: 1.03,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  };

  const tiltRight = {
    rotate: 4,
    scale: 1.03,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  };

  return (
    <div
      ref={ref}
      className="relative flex justify-center items-end gap-[59px] md:h-[814px]"
    >
      {/* Left Image */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sideVariantsRight}
        whileHover={tiltLeft}
        className="absolute bottom-0 left-0 z-0 
                   shadow-[0px_4px_147.1px_0px_rgba(0,0,0,0.25)]
                   w-[120px] h-[258px] rounded-[15px]
                   md:w-[252px] md:h-[546px] md:rounded-[30px]
                   bg-[url('/images/Home_left.png')] bg-cover"
      />

      {/* Center: Card or Video */}
      <CenterImage />

      {/* Right Image */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sideVariantsLeft}
        whileHover={tiltRight}
        className="absolute bottom-0 right-0 z-0
                   shadow-[0px_4px_147.1px_0px_rgba(0,0,0,0.25)]
                   w-[120px] h-[258px] rounded-[15px]
                   md:w-[252px] md:h-[546px] md:rounded-[30px]
                   bg-[url('/images/Home_right.png')] bg-cover"
      />
    </div>
  );
}
