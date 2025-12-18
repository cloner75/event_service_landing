'use client';

import { useEffect, useRef, useState } from 'react';
import LinkOutlineIcon from './icons/link-outline';
import InviteLineIcon from './icons/invite-line';

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setOpen(false);
  }

  function handleEmail() {
    window.location.href = `mailto:?subject=Share&body=${window.location.href}`;
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="mr-[15px] relative w-10">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" transition hover:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] w-10 h-10 bg-[#F6F6F6] rounded-full flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L12 2M12 2L9 5M12 2V14M6 9H4V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V9H18"
            stroke="#7A7A7A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="backdrop-blur-[3.65px] bg-[rgba(19,19,19,0.95)] shadow-[0px_10px_18.3px_rgba(0,0,0,0.3)] absolute right-0 mt-2 w-44 rounded-2xl border  z-50">
          <button
            onClick={handleCopy}
            className="hover:opacity-80 w-full gap-2.5 items-center px-3 flex text-[12px] h-[39px] text-white"
          >
            <LinkOutlineIcon />
            Copy Link
          </button>
          <div className="w-full h-px bg-[#232323]"></div>
          <button
            onClick={handleEmail}
            className="hover:opacity-80 w-full gap-2.5 items-center px-3 flex text-[12px] h-[39px] text-white"
          >
            <InviteLineIcon />
            Send Email
          </button>
        </div>
      )}
    </div>
  );
}
