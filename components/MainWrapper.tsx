"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

function MainWrapper({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // animation runs only the first time
    margin: "-400px 0px", // start earlier (optional)
  });
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{
          duration: 1.3,
          ease: "easeOut",
        }}
        className={`absolute ${
          isHome ? "block" : "hidden"
        } h-[800px] left-0 top-[700px] w-full bg-[url('/images/sword.svg')] sm:bg-[url('/images/sword_2.svg')] bg-no-repeat bg-center`}
      ></motion.div>

      {children}
    </div>
  );
}

export default MainWrapper;
