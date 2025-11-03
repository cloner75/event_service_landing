"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DownloadApp from "./DownloadApp";

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

  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 z-100000000 py-[30px] left-0 w-full bg-white z-50 text-[#131313]">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center gap-[20px] lg:gap-[60px] 2xl:gap-[80px] h-16">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex cursor-pointer justify-center items-center justify-center md:hidden w-[48px] h-[48px] shadow-[0px_4px_17.9px_0px_#00000024] rounded-[15px]"
            >
              <button className="flex flex-col items-center justify-between w-6 h-3 focus:outline-none shadow-[0px_4px_17.9px_0px_#00000024]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                >
                  <path
                    d="M1 12C0.71667 12 0.479337 11.904 0.288004 11.712C0.0966702 11.52 0.000670115 11.2827 3.44827e-06 11C-0.000663218 10.7173 0.0953369 10.48 0.288004 10.288C0.48067 10.096 0.718003 10 1 10H17C17.2833 10 17.521 10.096 17.713 10.288C17.905 10.48 18.0007 10.7173 18 11C17.9993 11.2827 17.9033 11.5203 17.712 11.713C17.5207 11.9057 17.2833 12.0013 17 12H1ZM1 7C0.71667 7 0.479337 6.904 0.288004 6.712C0.0966702 6.52 0.000670115 6.28267 3.44827e-06 6C-0.000663218 5.71733 0.0953369 5.48 0.288004 5.288C0.48067 5.096 0.718003 5 1 5H17C17.2833 5 17.521 5.096 17.713 5.288C17.905 5.48 18.0007 5.71733 18 6C17.9993 6.28267 17.9033 6.52033 17.712 6.713C17.5207 6.90567 17.2833 7.00133 17 7H1ZM1 2C0.71667 2 0.479337 1.904 0.288004 1.712C0.0966702 1.52 0.000670115 1.28267 3.44827e-06 1C-0.000663218 0.717333 0.0953369 0.48 0.288004 0.288C0.48067 0.0960001 0.718003 0 1 0H17C17.2833 0 17.521 0.0960001 17.713 0.288C17.905 0.48 18.0007 0.717333 18 1C17.9993 1.28267 17.9033 1.52033 17.712 1.713C17.5207 1.90567 17.2833 2.00133 17 2H1Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className={`
               text-2xl font-bold text-indigo-600`}
            >
              <div
                className={
                  "relative w-[83px] h-[29px] md:w-[148px] md:h-[53px] overflow-hidden"
                }
              >
                <Image
                  src={`/images/Dopin.svg`}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex sm:gap-[10px] md:gap-[20px] lg:gap-[30px] 2xl:gap-[48px]">
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

          <div className={`"flex min-w-[200px]`}>
            <DownloadApp />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col space-y-2 px-4 py-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${
                    isActive ? "font-bold text-indigo-600" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
