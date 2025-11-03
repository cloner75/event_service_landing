import Link from "next/link";

const menuItems = [
  { label: "Privacy", href: "/features" },
  { label: "Terms", href: "/pricing" },
  { label: "Community Guidelines", href: "/community-guidline" },
  { label: "About Dopin", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Report", href: "/report" },
  { label: "Data Policy", href: "/data-policy" },
  { label: "Event Submission Policy", href: "/event-submission-policy" },
];

export default function Footer() {
  return (
    <footer className="text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Navigation Links */}
          <div className="flex justify-center text-[#7A7A7A] text-center gap-3 md:gap-10 flex-wrap text-[10px] md:text-[12px] md:flex-row space-y-2 md:space-y-0 text-center md:text-left">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-indigo-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 text-center text-[10px] md:text-[12px] text-gray-500">
          &copy; All Right Resaved for <span className="font-bold">Dopin LLC</span> • Copyright {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
