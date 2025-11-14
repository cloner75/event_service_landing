"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function getRandomFloatParams() {
  const yOffset = Math.random() * 15 + 5;
  const duration = Math.random() * 2 + 2;
  const delay = Math.random() * 0.3;
  return { yOffset, duration, delay };
}

export default function PersonImage({
  imgName,
  style = "",
  appearDelay = 0,
}: {
  imgName: string;
  style?: string;
  appearDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" }); // triggers earlier

  const { yOffset, duration, delay } = getRandomFloatParams();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: [0, -yOffset, 0],
            }
          : {
              opacity: 0,
              y: 20,
            }
      }
      transition={{
        opacity: {
          duration: 0.6,
          ease: "easeOut",
          delay: appearDelay,
        },
        y: {
          repeat: isInView ? Infinity : 0, // float only when visible
          repeatType: "loop",
          duration,
          ease: "easeInOut",
          delay: appearDelay + delay,
        },
      }}
      className={`absolute w-[57px] h-[57px] rounded-[16px] md:rounded-[30px] md:h-[100px] md:w-[100px] overflow-hidden ${style}`}
    >
      <Image
        src={`/images/people/${imgName}`}
        alt=""
        fill
        className="object-cover"
      />
    </motion.div>
  );
}
