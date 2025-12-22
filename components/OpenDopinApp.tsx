'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function OpenDopinApp() {
  const pathname = usePathname();
  const idx = 'idXXXXXXXXX';
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    let dl = sessionStorage.getItem('dl');
    if (pathname != '/' && isIOS && (!dl || dl != 'true')) {
      sessionStorage.setItem('dl', 'true');
      window.location.href = `https://apps.apple.com/app/${idx}`;
    }
  }, []);

  return undefined;
}
