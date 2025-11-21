"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TypingH5() {
  const fullText = "Where Every Location Has a Story";
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 2400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!show) return;

    let current = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, current + 1));
      current++;
      if (current === fullText.length) clearInterval(interval);
    }, 50); // adjust typing speed here (50ms per character)

    return () => clearInterval(interval);
  }, [show]);

  return (
    <motion.h5
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        bounce: 0.35,
        type: "spring",
        delay: 1.7,
      }}
      className="text-[14px] md:text-[32px]"
    >
      {text}
      <span className="animate-blink">|</span>
    </motion.h5>
  );
}
