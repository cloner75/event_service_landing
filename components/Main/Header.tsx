import Image from 'next/image';
import DownloadModal from './DownloadModal';
import ModalClickable from '../ModalClickable';
import SquircleShape from '../SquircleShape';
import MotionDiv from '../MotionDiv';

export default function Header() {
  return (
    <header className="px-2 select-none flex items-center max-w-[646px] pt-8 mb-6 mx-auto w-full">
      <MotionDiv className="flex-1">
        <Image
          width={112}
          height={38}
          src="/images/Dopin.svg"
          alt=""
          className="object-cover"
        />
      </MotionDiv>
      <MotionDiv className="flex-none">
        <ModalClickable
          modalName="main"
          trigger={
            <div className="transition shadow-[0px_4px_62.4px_rgba(0,0,0,0.39)] hover:shadow-[0px_4px_62.4px_rgba(0,0,0,0.69)] rounded-[16px]">
              <SquircleShape cornerRadius={16}>
                <button className="  bg-black px-3 gap-3 w-44.5 h-13.75 items-center  flex">
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
                    <div className="leading-[18px] text-left">
                      Download on <br />
                      <b>AppStore</b>
                    </div>
                  </div>
                </button>
              </SquircleShape>
            </div>
          }
        />
      </MotionDiv>
    </header>
  );
}
