"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

const pinPositions = [
  { top: "3rem", left: "-2rem" },
  { top: "11rem", left: "-2rem" },
  { top: "4rem", right: "-2rem" },
  { top: "10rem", right: "4rem" },
];

export default function CardWithPins() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-300px" });

  // Pin component with its own animation controller
  function Pin({ pos, index }) {
    const controls = useAnimation();

    useEffect(() => {
      if (!isInView) return;

      // entrance animation
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
          // start continuous "alive" bounce after entrance completes
          const duration = 2.0 + Math.random() * 1.2; // 2.0 - 3.2s
          const initialOffset = Math.random() * 0.6; // small random start offset
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
      >
        <div className="w-[80px] h-[60px] sm:w-[100px] sm:h-[80px] md:w-[120px] md:h-[100px] relative">
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
      initial={{ y: 100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 shadow-[0px_4px_147.1px_0px_rgba(0,0,0,0.25)] w-[186px] h-[402px] rounded-[32px] md:w-[376px] md:h-[814px] md:rounded-[47px] bg-[url('/images/Home_2.png')] bg-cover"
    >
      {pinPositions.map((pos, idx) => (
        <Pin key={idx} pos={pos} index={idx} />
      ))}
    </motion.div>
  );
}
