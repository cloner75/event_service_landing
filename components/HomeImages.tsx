"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import CenterImage from "./CenterImage";

export default function HomeImages() {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-300px 0px" });
  const [showSides, setShowSides] = useState(false);

  // Delay mounting side images
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowSides(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isInView]);

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
      className="relative flex justify-center items-end gap-[59px]
                 sm:max-w-[500px] lg:max-w-[100%] mx-auto lg:h-[814px]"
    >
      {/* Left Image */}
      {showSides && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sideVariantsRight}
          whileHover={tiltLeft}
          whileTap={tiltLeft}
          className="absolute bottom-0 left-[-60px] md:left-0 z-0
                     w-[120px] h-[258px] rounded-[15px]
                     lg:w-[252px] lg:h-[546px] lg:rounded-[30px]
                     shadow-[0px_4px_147.1px_0px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          <Image
            fill
            priority={true}
            src="/images/Home_left.png"
            alt="Left"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </motion.div>
      )}

      {/* Center Image / Video */}
      <CenterImage />

      {/* Right Image */}
      {showSides && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sideVariantsLeft}
          whileHover={tiltRight}
          whileTap={tiltRight}
          className="absolute bottom-0 right-[-60px] md:right-0 z-0
                     w-[120px] h-[258px] rounded-[15px]
                     lg:w-[252px] lg:h-[546px] lg:rounded-[30px]
                     shadow-[0px_4px_147.1px_0px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          <Image
            fill
            priority={true}
            src="/images/Home_right.png"
            alt="Right"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      )}
    </div>
  );
}
