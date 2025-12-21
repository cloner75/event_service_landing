"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FriendsTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-150px 0px",
  });

  return (
    <motion.h2
      ref={ref}
      initial={{ y: 180, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 180, opacity: 0 }}
      transition={{
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      }}
      className="text-center max-w-[300px] lg:max-w-[900px] mx-auto text-[48px] mt-[130px] lg:text-[96px] font-[860]"
    >
      Connect <br className="lg:hidden" /> Beyond{" "}
      <br className="hidden lg:block" /> the Moments
    </motion.h2>
  );
}
