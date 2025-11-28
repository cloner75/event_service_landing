"use client";

import Image from "next/image";
import DownloadApp from "@/components/DownloadApp";
import { motion } from "framer-motion";
import PeopleGroup from "@/components/PeopleGroup";
import HomeImages from "@/components/HomeImages";
import TypingH5 from "@/components/TypingH5";
import FriendsStack from "@/components/FriendsStack";
import FriendsTitle from "@/components/FriendsTitle";
import PersonWithQuote from "@/components/PersonWithQuote";
import PersonQuotes from "@/components/PersonQuotes";
import TitleWithBackgroundImage from "@/components/TitleWithBackgroundImage";
import FooterBackground from "@/components/FooterBackground";

export default function Home() {
  return (
    <div className="leading-tight home_page">
      <section className="relative">
        <PeopleGroup />

        <div className="flex my-[80px] md:my-[0px] flex-col items-center">
          <motion.div
            initial={{ scale: 3, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="relative w-[249px] h-[89px] md:w-[724px] md:h-[257px] overflow-hidden"
          >
            <Image
              src="/images/Dopin.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.h3
            initial={{ y: -80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              bounce: 0.35,
              type: "spring",
              delay: 0.3,
            }}
            className="text-center text-[24px] md:text-[64px] font-[860]"
          >
            Dopins are just beginning
          </motion.h3>

          <motion.h5
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              bounce: 0.35,
              type: "spring",
              delay: 0.7,
            }}
            className="text-[14px] md:text-[32px]"
          >
            <TypingH5 />
          </motion.h5>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              bounce: 0.35,
              type: "spring",
              delay: 1.2,
            }}
          >
            <DownloadApp />
          </motion.div>
        </div>

        <HomeImages />
      </section>

      <section className="relative">
        <div className="flex flex-col">
          <FriendsTitle />

          <div className="relative">
            <FriendsStack />

            <PersonQuotes />
          </div>

          <div className="flex mt-[700px] md:mt-[180px] flex-col items-center">
            <h2 className="text-center text-[#FFFFFF] max-w-[310px] md:max-w-[790px] text-[64px] font-[860]">
              Your City’s Stories, Your New Friends.
            </h2>
            <DownloadApp hideBadgeOnMobile={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
