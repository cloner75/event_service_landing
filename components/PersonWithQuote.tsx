"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function PersonWithQuote({
  imgName,
  title,
  quote,
  style = "",
}: {
  imgName: string;
  title: string;
  quote: string;
  style?: string;
}) {
  const personDelay = Math.random() * 2;

  // Floating properties
  const floatDistance = 12 + Math.random() * 6; // 12–18px
  const floatDuration = 4 + Math.random() * 2; // 4–6s
  const floatDelay = Math.random() * 1.5;

  const floatControls = useAnimation();

  useEffect(() => {
    // Start floating after mount
    floatControls.start({
      y: [0, -floatDistance, -floatDistance / 2, 0],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: floatDuration,
        ease: "easeInOut",
        delay: floatDelay,
      },
    });
  }, [floatControls, floatDistance, floatDuration, floatDelay]);

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        delay: personDelay,
        staggerChildren: 0.35,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const imageEntrance = {
    hidden: { opacity: 0, scale: 1.3, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={`absolute z-50 flex flex-col ${style}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Entrance animation */}
      <motion.div variants={imageEntrance} initial="hidden" animate="visible">
        {/* Floating animation applied here */}
        <motion.div
          animate={floatControls}
          className="relative w-[57px] h-[57px] rounded-[16px] lg:rounded-[30px] lg:h-[100px] lg:w-[100px] overflow-hidden"
        >
          <Image
            src={`/images/people/${imgName}`}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.h5
        variants={itemVariant}
        className="text-[24px] font-[700] pl-[10px] mt-2"
      >
        {title}
      </motion.h5>

      <motion.p
        variants={itemVariant}
        className="text-[14px] font-regular max-w-[40%] lg:max-w-[314px] pl-[10px] mt-1"
      >
        {quote}
      </motion.p>
    </motion.div>
  );
}
