"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Privacy", href: "/features" },
  { label: "Terms", href: "/pricing" },
  { label: "Community Guidelines", href: "/community-guideline" },
  { label: "About Dopin", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Report", href: "/report" },
  { label: "Data Policy", href: "/data-policy" },
  { label: "Event Submission Policy", href: "/event-submission-policy" },
];

export default function Footer() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  const itemsTextColor = isHome ? "text-[#FFFFFF]" : "text-[#7A7A7A]";

  return (
    <footer className="relative text-gray-700 mt-16">
      {/* Background Image */}
      {isHome && (
        <div className="absolute [clip-path:polygon(0_10%,_100%_0,_100%_100%,_0%_100%)] md:[clip-path:polygon(0_25%,_100%_0,_100%_100%,_0%_100%)] h-[900px] md:h-[650px] w-full bottom-0 right-0 z-[-2]">
          <div className="absolute inset-0 bg-[url('/images/friends_2.png')] bg-cover [background-position:center_53%] bg-no-repeat"></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>{" "}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="flex justify-center md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Navigation Links */}
          <div
            className={`flex justify-center ${itemsTextColor} text-center gap-3 md:gap-10 flex-wrap text-[10px] md:text-[12px] md:flex-row space-y-2 md:space-y-0 text-center md:text-left`}
          >
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div
          className={`mt-8 text-center text-[10px] md:text-[12px] ${itemsTextColor}`}
        >
          &copy; All Right Resaved for{" "}
          <span className="font-bold">Dopin LLC</span> • Copyright{" "}
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
