"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FriendsStack() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-200px 0px",
  });

  // Main image animation duration
  const MAIN_DURATION = 0.9;

  return (
    <div
      ref={ref}
      className="relative flex justify-center h-[412px] md:h-[785px]"
    >
      {/* LEFT CARD — fan-out from behind */}
      <motion.div
        initial={{
          scale: 0.88,
          opacity: 0,
          x: 0,
          y: 0,
          rotate: 0,
        }}
        animate={
          isInView
            ? {
                scale: 1,
                opacity: 1,
                x: -120, // slide left like a card fan
                y: 40, // slight downward push
                rotate: -7.54, // final tilt
              }
            : {
                scale: 0.88,
                opacity: 0,
                x: 0,
                y: 0,
                rotate: 0,
              }
        }
        transition={{
          duration: 0.7,
          ease: [0.25, 0.8, 0.25, 1],
          delay: MAIN_DURATION + 0.1,
        }}
        className="absolute z-2 bg-[#E5E5E5] w-[265px] h-[371px] md:w-[505px] md:h-[705px] rounded-[62px]"
        style={{ bottom: 0 }}
      />

      {/* RIGHT CARD — fan-out from behind */}
      <motion.div
        initial={{
          scale: 0.88,
          opacity: 0,
          x: 0,
          y: 0,
          rotate: 0,
        }}
        animate={
          isInView
            ? {
                scale: 1,
                opacity: 1,
                x: 120, // slide right
                y: 40,
                rotate: 3.46, // final tilt
              }
            : {
                scale: 0.88,
                opacity: 0,
                x: 0,
                y: 0,
                rotate: 0,
              }
        }
        transition={{
          duration: 0.7,
          ease: [0.25, 0.8, 0.25, 1],
          delay: MAIN_DURATION + 0.22, // small stagger
        }}
        className="absolute z-1 bg-[#DBDBDB] w-[265px] h-[371px] md:w-[505px] md:h-[705px] rounded-[62px]"
        style={{ bottom: 0 }}
      />

      {/* MAIN IMAGE */}
      <motion.div
        initial={{ scale: 2.5, opacity: 0, y: 60 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1, y: 0 }
            : { scale: 1.35, opacity: 0, y: 60 }
        }
        transition={{
          duration: MAIN_DURATION,
          ease: "easeOut",
        }}
        className="absolute z-20 w-[281px] h-[412px] md:w-[535px] md:h-[783px] rounded-[47px] bg-[url('/images/friends.jpg')] bg-cover"
        style={{ bottom: 0 }}
      />
    </div>
  );
}
