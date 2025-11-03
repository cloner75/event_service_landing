"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div>
      <div
        className={`absolute ${
          isHome ? "block" : "hidden"
        } h-[800px] left-0 top-[700px] w-[100%] bg-[url('/images/sword.svg')] sm:bg-[url('/images/sword_2.svg')] bg-no-repeat bg-center`}
      ></div>
      {children}
    </div>
  );
}

export default MainWrapper;
