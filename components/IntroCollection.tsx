import { motion } from "framer-motion";
import Image from "next/image";
import TypingH5 from "./TypingH5";
import DownloadApp from "./DownloadApp";

const fadeScale = {
  hidden: { scale: 3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const slideDown = (delay = 0) => ({
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.35,
      delay,
    },
  },
});

const slideUp = (delay = 0) => ({
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.35,
      delay,
    },
  },
});

function IntroCollection() {
  return (
    <div className="flex my-[80px] lg:my-[0px] flex-col items-center">
      <motion.div
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-[265px] h-[89px] lg:w-[760px] lg:h-[257px] overflow-hidden"
      >
        <Image
          alt="Dopin"
          src="/images/Dopin.svg"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.h3
        variants={slideDown(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-[24px] lg:text-[64px] font-[860]"
      >
        Dopins are just beginning
      </motion.h3>

      <motion.h5
        variants={slideUp(0.7)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[14px] lg:text-[32px]"
      >
        <TypingH5 />
      </motion.h5>

      <motion.div
        variants={slideUp(1.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-[30px] mb-[50px]"
      >
        <DownloadApp />
      </motion.div>
    </div>
  );
}

export default IntroCollection;
