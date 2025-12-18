'use client';

import Image from 'next/image';
import SquircleShape from '../SquircleShape';
import { useModal } from '@/context/ModalContext';
import Link from 'next/link';

export default function DopinModal() {
  const { open, closeModal } = useModal();
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-20 px-3 bg-black/50 backdrop-blur-lg flex items-center justify-center"
    >
      <SquircleShape additionalclasses="" cornerRadius={60}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FFFFFF] px-5 py-5 max-w-[446px] w-full"
        >
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
          <div className="flex justify-center my-[30px]">
            <Link
              href="https://apps.apple.com/us/app/dopin-app/idXXXXXXXXX"
              className="transition rounded-[16px] shadow-[0px_4px_62.4px_rgba(0,0,0,0.39)] "
            >
              <SquircleShape
                additionalclasses="bg-black px-3 gap-3 w-[222px] h-13.75 items-center flex"
                cornerRadius={16}
              >
                <div className="flex-none">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5641 9.62933C14.3961 9.62933 12.5881 8.30133 10.6841 8.34933C8.17206 8.38133 5.86806 9.80533 4.57206 12.0613C1.96406 16.5893 3.90006 23.2773 6.44406 26.9573C7.69206 28.7493 9.16406 30.7653 11.1161 30.7013C12.9881 30.6213 13.6921 29.4853 15.9641 29.4853C18.2201 29.4853 18.8601 30.7013 20.8441 30.6533C22.8601 30.6213 24.1401 28.8293 25.3721 27.0213C26.7961 24.9413 27.3881 22.9253 27.4201 22.8133C27.3721 22.7973 23.5001 21.3093 23.4521 16.8293C23.4201 13.0853 26.5081 11.2933 26.6521 11.2133C24.8921 8.63733 22.1881 8.34934 21.2441 8.28534C18.7801 8.09334 16.7161 9.62933 15.5641 9.62933ZM19.7241 5.85333C20.7641 4.60533 21.4521 2.86134 21.2601 1.13334C19.7721 1.19734 17.9801 2.12533 16.9081 3.37333C15.9481 4.47733 15.1161 6.25333 15.3401 7.94933C16.9881 8.07733 18.6841 7.10133 19.7241 5.85333Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="font-normal text-[16px] leading-[18px] text-left">
                    Download Dopin on <br />
                    <b>AppStore</b>
                  </div>
                </div>
              </SquircleShape>
            </Link>
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
