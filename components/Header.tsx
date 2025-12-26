"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DownloadApp from "./DownloadApp";
import { motion } from "framer-motion";
import CopyRight from "./CopyRight";
import useWindowWidth from "@/hooks/useWindowWidth";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Download", href: "#", isExternal: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Community Guidelines", href: "/community-guideline" },
  { label: "About Dopin", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [showOnScroll, setShowOnScroll] = useState(false);
  const width = useWindowWidth();

  const isSmallScreen = width < 1024;

  const isHome = pathname === "/";

  const mobileMenuBtnIcon = menuOpen ? "cross_icon.svg" : "hamburger.svg";

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 50) {
        setShowOnScroll(true);
      } else {
        setShowOnScroll(false);
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // prevent page scroll
    } else {
      document.body.style.overflow = ""; // restore scrolling
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${isSmallScreen ? "fixed" : "sticky"} ${
        menuOpen ? "h-full" : ""
      } lg:h-auto top-0 z-100000000 py-[40px] lg:py-[30px] pt-[10px] lg:pt-[30px] left-0 w-full ${
        menuOpen
          ? "bg-[linear-gradient(360deg,rgba(255,255,255,0)_0%,#ffffff_0%)]"
          : "bg-[linear-gradient(360deg,rgba(255,255,255,0)_0%,#ffffff_31.43%)]"
      } lg:bg-[linear-gradient(360deg,rgba(255,255,255,0)_0%,#ffffff_71.43%)] z-50 text-[#131313]`}
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between lg:justify-between w-full h-16">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex cursor-pointer justify-center items-center justify-center lg:hidden w-[48px] h-[48px] shadow-[0px_4px_17.9px_0px_#00000024] rounded-[15px]"
            >
              <Image
                width={14}
                height={14}
                alt="hamburger-icon"
                src={`/images/icons/${mobileMenuBtnIcon}`}
              />
            </div>

            {/* Logo */}
            <motion.div
              initial={
                isSmallScreen && menuOpen
                  ? { opacity: 1, y: -10 }
                  : { opacity: 0, y: -10 }
              }
              animate={
                isSmallScreen && menuOpen
                  ? { opacity: 1, y: 0 }
                  : showOnScroll
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:block" // only show on desktop
            >
              <Link href="/">
                <div className="relative w-[83px] h-[29px] lg:w-[162px] lg:h-[53px] overflow-hidden">
                  <Image
                    src="/images/Dopin.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center sm:gap-[10px] lg:gap-[20px] lg:gap-[30px] 2xl:gap-[48px]">
            {menuItems.map((item) => {
              const isActive = pathname === item.href; // match route

              if (item.isExternal) {
                return (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${isActive ? "font-bold" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={`"flex`}>
            <motion.div
              initial={
                isSmallScreen && menuOpen
                  ? { opacity: 1, y: -10 }
                  : { opacity: 0, y: -10 }
              }
              animate={
                isSmallScreen && menuOpen
                  ? { opacity: 1, y: 0 }
                  : showOnScroll
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="lg:flex" // only on desktop
            >
              <DownloadApp isInHeader={true} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col justify-between right-0 h-full bg-[linear-gradient(360deg,rgba(255,255,255,0)_0%,#ffffff_13%)] left-0 lg:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex justify-between transition text-[36px] font-[860] ${
                    isActive ? "font-bold text-indigo-600" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>

                  <Image
                    alt=""
                    width={8}
                    height={16}
                    src="/images/icons/chevronRight.svg"
                  />
                </Link>
              );
            })}
          </nav>
          <CopyRight className="m-auto mb-[50px]" />
        </div>
      )}
    </motion.header>
  );
}
