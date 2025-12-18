'use client';

import Image from 'next/image';
import SquircleShape from '../SquircleShape';
import { useModal } from '@/context/ModalContext';

export default function DopinModal() {
  const { open, closeModal } = useModal();
  return (
    <div className="fixed inset-0 z-20 px-3 bg-black/50 backdrop-blur-lg flex items-center justify-center">
      <SquircleShape additionalclasses="" cornerRadius={60}>
        <div className="bg-[#FFFFFF] px-5 py-5 max-w-[446px] w-full">
          <Image
            alt=""
            src="/images/dopin-modal-image.png"
            width={252}
            height={88}
            className="mx-auto"
            quality={1000}
          />
          <div className="text-[14px] font-bold text-center mt-[20px]">
            See Everything Inside the App ✨
          </div>
          <div className="text-[14px] text-center mt-[10px] max-w-[381px]">
            Tap into full profiles, all moments, and the real Dopin experience.
            Download the app to keep exploring!
          </div>
          <div className="flex justify-center mt-[25px]">
            <button onClick={closeModal} className="text-[14px] text-[#7A7A7A]">
              Continue on the web
            </button>
          </div>
        </div>
      </SquircleShape>
    </div>
  );
}
