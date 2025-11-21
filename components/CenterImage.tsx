"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CardWithPins from "./CardWithPins";
import { CARDS_MODE, HOME_VIDEO_PATH } from "@/configs";

interface CenterImageProps {
  mode: "video" | "card";
  videoSrc?: string;
  className?: string;
}

export default function CenterImage({ className }: CenterImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-200px 0px" });

  const mode = CARDS_MODE;
  const videoSrc = HOME_VIDEO_PATH;

  // Play/pause video based on in-view
  if (mode === "video" && videoRef.current) {
    if (isInView && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else if (!isInView && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }

  return (
    <div ref={ref} className={`${className} z-100`}>
      {mode === "video" ? (
        <motion.video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          className="w-[180px] h-[320px] md:w-[360px] md:h-[640px] rounded-[20px] object-cover shadow-lg"
          initial={{ y: -100, opacity: 1, rotate: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ) : (
        <CardWithPins />
      )}
    </div>
  );
}
