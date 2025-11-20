"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

// 50 working Unsplash URLs (stable, pre-picked images)
const images = [
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1465146633013-3d1f6a31288b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1465146633013-3d1f6a31288b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1465146633013-3d1f6a31288b?auto=format&fit=crop&w=1600&q=80",
];

export default function TitleWithBackgroundShuffle() {
  const controls = useAnimationControls();

  useEffect(() => {
    let frame = 0;
    const durationFrames = 60;

    const step = () => {
      if (frame < durationFrames) {
        const img = images[Math.floor(Math.random() * images.length)];
        controls.start({
          backgroundImage: `url(${img})`,
          transition: { duration: 0.1 },
        });
        frame++;
        requestAnimationFrame(step);
      }
    };

    step();
  }, [controls]);

  return (
    <motion.h2
      initial={{ scale: 15, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-[310px] md:max-w-[790px] text-[64px] font-[860] text-transparent bg-clip-text bg-cover bg-center"
      animate={controls}
    >
      Your City’s Stories, Your New Friends.
    </motion.h2>
  );
}
