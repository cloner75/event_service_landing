'use client';

import { useEffect } from 'react';
export default function OpenDopinApp() {
  const idx = 'idXXXXXXXXX';
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      window.location.href = `https://apps.apple.com/app/${idx}`;
    }
  }, []);

  return undefined;
}
