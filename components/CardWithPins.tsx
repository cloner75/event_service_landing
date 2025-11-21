"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import { SLIDE_DURATION, IMAGE_WITH_PINS, SLIDE_IMAGES } from "@/configs";

const pinPositions = [
  { top: "8%", left: "-10%" },
  { top: "20%", left: "-15%" },
  { top: "10%", right: "-20%" },
  { top: "10rem", right: "4rem" },
];

export default function CardWithPins() {
  const images = SLIDE_IMAGES;
  const slideInterval = SLIDE_DURATION;
  const pinsOnImage = IMAGE_WITH_PINS;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-300px" });
  // const isInView = false;
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = useWindowWidth();

  const isSmall = width < 768;

  const renderingPinPositions = isSmall
    ? pinPositions.slice(0, 3)
    : pinPositions;

  // Slide show effect
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isInView, images.length, slideInterval]);

  // Pin component
  function Pin({ pos, index }: any) {
    const controls = useAnimation();

    useEffect(() => {
      if (!isInView) return;

      const entranceDelay = 0.6 * index;
      controls
        .start({
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: entranceDelay,
          },
        })
        .then(() => {
          const duration = 2.0 + Math.random() * 1.2;
          const initialOffset = Math.random() * 0.6;
          controls.start({
            y: [0, -6, 0, -3, 0],
            transition: {
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: initialOffset,
            },
          });
        });
    }, [isInView, index, controls]);

    return (
      <motion.div
        className="absolute cursor-pointer"
        style={pos}
        initial={{ scale: 0, opacity: 0, y: 0 }}
        animate={controls}
        whileHover={{
          rotate: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.6, repeat: 0, ease: "easeInOut" },
        }}
        whileTap={{
          rotate: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.6, repeat: 0, ease: "easeInOut" },
        }}
      >
        <div className="w-[80px] h-[60px] sm:w-[100px] sm:h-[80px] md:w-[130px] md:h-[120px] relative">
          <Image
            src="/dopin_item.svg"
            alt="pin"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ y: 150, opacity: 1, rotate: -10 }}
      animate={isInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 shadow-[0px_4px_147.1px_0px_rgba(0,0,0,0.25)] w-[186px] h-[402px] rounded-[32px] md:w-[376px] md:h-[814px] md:rounded-[47px]"
    >
      {/* Image Slides */}
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 bg-cover bg-top w-full h-full rounded-[inherit]"
          style={{ backgroundImage: `url('/images/${img}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      ))}

      {/* Pins only on specific image */}
      {images[currentIndex] === pinsOnImage &&
        renderingPinPositions.map((pos, idx) => (
          <Pin key={idx} pos={pos} index={idx} />
        ))}
    </motion.div>
  );
}
