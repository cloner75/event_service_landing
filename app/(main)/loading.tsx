import SquircleShape from '@/components/SquircleShape';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-20 px-3 bg-black/50 backdrop-blur-lg flex items-center justify-center">
      <div className="rounded-[60px] overflow-hidden">
        <div className="bg-white px-25 py-15 min-w-[250px] max-w-[446px] w-full">
          <Image
            alt=""
            src="/images/Dopin.svg"
            width={252}
            height={88}
            className="mx-auto w-[200px]"
          />
          <div className="text-[16px] font-bold text-center mt-[20px]">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
}
