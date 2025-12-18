import { motion } from 'framer-motion';
import CameraStarIcon from '@/components/icons/camera-star';
import EventsIcon from '@/components/icons/events';
import Image2FillIcon from '@/components/icons/image-2-fill';
import LockSolidIcon from '@/components/icons/lock-solid';
import PictureIcon from '@/components/icons/picture';
import UserInfoLineIcon from '@/components/icons/user-info-line';
import ModalClickable from '@/components/ModalClickable';
import ShareButton from '@/components/ShareButton';
import SquircleShape from '@/components/SquircleShape';
import { ProfileResponse } from '@/Dto/profile-dto';
import { Metadata } from 'next';
import Image from 'next/image';
import MotionSection from '@/components/MotionSection';
import SafeImage from '@/components/SafeImage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/profile/${slug}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return {
        title: 'Profile not found | Dopin',
        description: 'This profile does not exist or is private.',
        robots: { index: false, follow: false },
      };
    }

    const data: ProfileResponse = await res.json();
    const profile = data.data;

    const title = `${profile.name ?? ''}  | Dopin`;
    const description =
      profile.bio ||
      `View ${profile.name}'s profile on Dopin. ${profile.total_friends} friends and ${profile.total_dopins} dopins.`;

    const avatarUrl = profile.avatar
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${profile.avatar}?size=small`
      : undefined;

    return {
      title,
      description,

      alternates: {
        canonical: `/profile/${slug}`,
      },

      openGraph: {
        title,
        description,
        url: `/profile/${slug}`,
        siteName: 'Dopin',
        type: 'profile',
        images: avatarUrl
          ? [
              {
                url: avatarUrl,
                width: 400,
                height: 400,
                alt: profile.name,
              },
            ]
          : [],
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: avatarUrl ? [avatarUrl] : [],
      },

      robots: {
        index: profile.is_profile_public,
        follow: profile.is_profile_public,
      },
    };
  } catch {
    return {
      title: 'Profile | Dopin',
      description: 'User profile on Dopin',
      robots: { index: false, follow: false },
    };
  }
}
export default async function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/profile/${slug}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );
  const profileData: ProfileResponse = await data.json();
  const profile = profileData.data;

  return (
    <MotionSection className="relative">
      <SquircleShape topLeftCornerRadius={60} topRightCornerRadius={60}>
        <div className=" bg-white p-5 z-1 overflow-hidden">
          <div className="flex flex-nowrap gap-5">
            <div className="flex-none">
              <SquircleShape cornerRadius={40}>
                <SafeImage
                  height={136}
                  width={136}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${profile.avatar}?size=medium`}
                  alt=""
                  className="w-34  aspect-square object-cover overflow-hidden"
                />
              </SquircleShape>
            </div>
            <div className="flex-1">
              <div className="flex mb-10">
                <div>
                  <div className="text-black font-bold text-[24px] leading-7.25 flex items-center gap-0.25">
                    {profile.name}
                    <div className="h-7.25">
                      {profile.is_verified && <VerifyBadge />}
                    </div>
                  </div>
                  <div className="text-black font-normal text-[16px] ">
                    @{profile.username}
                  </div>
                </div>
              </div>
              {profile.is_profile_public && (
                <div className="flex gap-11.25">
                  <div className="text-center flex-none ">
                    <div className="leading-4.75 text-[16px] font-bold">
                      {profile.total_moments ?? 0}
                    </div>
                    <div className="leading-4 text-[12px] font-normal">
                      Moments
                    </div>
                  </div>
                  <div className="text-center flex-none ">
                    <div className="leading-4.75 text-[16px] font-bold">
                      {profile.total_friends ?? 0}
                    </div>
                    <div className="leading-4 text-[12px] font-normal">
                      Friend
                    </div>
                  </div>
                  <div className="text-center flex-none ">
                    <div className="leading-4.75 text-[16px] font-bold">
                      {profile.total_dopins ?? 0}
                    </div>
                    <div className="leading-4 text-[12px] font-normal">
                      Dopins
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-none">
              <ShareButton />
            </div>
          </div>
          <div className="mt-4 text-[16px]">{profile.bio}</div>
          {profile.is_founding || profile.is_ambassador ? (
            <div className="mt-5 gap-3 flex">
              {profile.is_founding && <FoundingBadge />}
              {profile.is_ambassador && <AmbassadorBadge />}
            </div>
          ) : null}
          <div className="mt-5 gap-3 flex">
            <ModalClickable
              modalName="dopin"
              trigger={
                <div className="transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-[8px] flex-1 w-full max-w-59.5">
                  <SquircleShape cornerRadius={8}>
                    <button className="transition w-full bg-[linear-gradient(140.98deg,#EC30E4_9.6%,#581DFF_93.68%)] text-[14px] font-semibold  h-10.5 text-white flex items-center justify-center">
                      Friend Request
                    </button>
                  </SquircleShape>
                </div>
              }
            />
            <ModalClickable
              modalName="main"
              trigger={
                <div className="transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-[8px] inline-block">
                  <SquircleShape
                    additionalclasses="!shadow-2xl"
                    cornerRadius={8}
                  >
                    <button className="transition bg-[rgba(217,217,217,0.23)] text-[14px] font-semibold w-28.5 h-10.5 text-black flex items-center justify-center">
                      Message
                    </button>
                  </SquircleShape>
                </div>
              }
            />
          </div>
          <div className="mt-5 gap-3 flex">
            <ModalClickable
              modalName="main"
              trigger={
                <div className="max-w-151.5 p-1.5 mx-auto rounded-full w-full h-14 shadow-[0px_4px_17.9px_rgba(0,0,0,0.14)] flex">
                  <button className="flex-1 rounded-full flex items-center justify-center h-full ">
                    <UserInfoLineIcon />
                  </button>
                  <button className="flex-1 rounded-full flex items-center justify-center h-full ">
                    <PictureIcon />
                  </button>
                  <button className="flex-1 rounded-full flex items-center justify-center h-full bg-[#F5F5F5]">
                    <CameraStarIcon />
                  </button>
                  <button className="flex-1 rounded-full flex items-center justify-center h-full ">
                    <EventsIcon />
                  </button>
                </div>
              }
            />
          </div>
        </div>
      </SquircleShape>
      {!profile.is_profile_public ? (
        <SquircleShape
          additionalclasses="pt-12 bg-white relative overflow-hidden"
          bottomLeftCornerRadius={60}
          bottomRightCornerRadius={60}
        >
          <div>
            <div className="flex justify-center">
              <LockSolidIcon />
            </div>
            <div className="text-center font-bold text-[14px] mt-4">
              Shh… It’s Private! 🤫
            </div>
            <div className="text-center text-[#7A7A7A] text-[14px] max-w-67.5 mx-auto mt-1">
              You’ll need to send a friend request to view this user’s
              activities and moments.
            </div>
            <div className="flex justify-center my-10">
              <ModalClickable
                modalName="main"
                trigger={
                  <div className="transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-[17px] inline-block">
                    <SquircleShape cornerRadius={17}>
                      <button
                        type="button"
                        className="bg-[#581DFF] mx-auto w-57 ml-auto text-white font-medium px-8 py-3"
                      >
                        Unlock
                      </button>
                    </SquircleShape>
                  </div>
                }
              />
            </div>
          </div>
        </SquircleShape>
      ) : (
        <div>
          {profile.me != null && profile.me.length > 0 ? (
            <div className="grid grid-cols-4 gap-px  bg-white relative min-h-[100px] rounded-b-[60px]">
              {profile.me.map((item) => (
                <div className="col-span-1" key={item}>
                  <SafeImage
                    height={136}
                    width={136}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${item}?size=medium`}
                    alt=""
                    className="h-56.5 w-full  object-cover overflow-hidden"
                  />
                </div>
              ))}
            </div>
          ) : (
            <SquircleShape
              additionalclasses="pt-20 pb-30 bg-white"
              bottomLeftCornerRadius={58}
              bottomRightCornerRadius={58}
            >
              <div>
                <div className="flex items-center justify-center ">
                  <Image2FillIcon />
                </div>
                <div className="text-center text-[14px] text-black font-bold">
                  No Photos
                </div>
                <div className="text-[14px] text-[#7A7A7A] max-w-[270px] text-center mx-auto">
                  This user hasn’t shared any photos yet. Check back soon.
                </div>
              </div>
            </SquircleShape>
          )}
          <SquircleShape
            additionalclasses="absolute pointer-events-none z-3 w-full h-71.75 bottom-0 left-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)0%,#FFFFFF_92.28%)]"
            bottomLeftCornerRadius={58}
            bottomRightCornerRadius={58}
          />

          <ModalClickable
            modalName="main"
            trigger={
              <div className="absolute z-4 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-[17px] inline-block">
                <SquircleShape cornerRadius={17}>
                  <button
                    type="button"
                    className="w-[228px] bg-[#581DFF] hover:opacity-95  text-[16px]  text-white font-medium px-8 py-3   transition"
                  >
                    Show more
                  </button>
                </SquircleShape>
              </div>
            }
          />
        </div>
      )}
    </MotionSection>
  );
}

function VerifyBadge() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5574 7.52399C20.3735 7.23018 20.1026 7.001 19.7823 6.86837C19.4621 6.73573 19.1085 6.70624 18.7707 6.78399L16.3734 7.33466C16.1277 7.39113 15.8724 7.39113 15.6267 7.33466L13.2294 6.78399C12.8916 6.70624 12.538 6.73573 12.2177 6.86837C11.8975 7.001 11.6266 7.23018 11.4427 7.52399L10.136 9.60933C10.0027 9.82266 9.8227 10.0027 9.60936 10.1373L7.52403 11.444C7.23072 11.6277 7.00188 11.8982 6.86927 12.2179C6.73667 12.5376 6.70688 12.8906 6.78403 13.228L7.3347 15.628C7.39096 15.8733 7.39096 16.1281 7.3347 16.3733L6.78403 18.772C6.70658 19.1096 6.73622 19.4629 6.86884 19.7829C7.00146 20.1028 7.23047 20.3735 7.52403 20.5573L9.60936 21.864C9.8227 21.9973 10.0027 22.1773 10.1374 22.3907L11.444 24.476C11.82 25.0773 12.5374 25.3747 13.2294 25.216L15.6267 24.6653C15.8724 24.6089 16.1277 24.6089 16.3734 24.6653L18.772 25.216C19.1096 25.2934 19.4629 25.2638 19.7829 25.1312C20.1029 24.9986 20.3736 24.7696 20.5574 24.476L21.864 22.3907C21.9974 22.1773 22.1774 21.9973 22.3907 21.864L24.4774 20.5573C24.7709 20.3733 24.9998 20.1023 25.1322 19.782C25.2646 19.4618 25.2939 19.1083 25.216 18.7707L24.6667 16.3733C24.6102 16.1276 24.6102 15.8723 24.6667 15.6267L25.2174 13.228C25.2949 12.8905 25.2655 12.5373 25.1331 12.2174C25.0008 11.8974 24.772 11.6266 24.4787 11.4427L22.392 10.136C22.179 10.0024 21.9989 9.82236 21.8654 9.60933L20.5574 7.52399ZM19.8867 13.0267C19.9692 12.875 19.9896 12.6973 19.9437 12.5309C19.8978 12.3645 19.7891 12.2224 19.6406 12.1345C19.492 12.0465 19.3152 12.0197 19.1472 12.0595C18.9793 12.0993 18.8333 12.2027 18.74 12.348L15.2534 18.2493L13.148 16.2333C13.0856 16.1692 13.0108 16.1183 12.9283 16.0837C12.8457 16.0491 12.7571 16.0314 12.6675 16.0318C12.578 16.0322 12.4895 16.0506 12.4072 16.0859C12.325 16.1213 12.2507 16.1728 12.1888 16.2375C12.1269 16.3022 12.0787 16.3787 12.047 16.4624C12.0153 16.5461 12.0008 16.6353 12.0043 16.7248C12.0078 16.8142 12.0293 16.9021 12.0676 16.983C12.1058 17.064 12.1599 17.1364 12.2267 17.196L14.9387 19.7947C15.0113 19.8641 15.0986 19.9162 15.1942 19.9471C15.2897 19.978 15.391 19.987 15.4905 19.9732C15.59 19.9595 15.6851 19.9235 15.7687 19.8679C15.8523 19.8122 15.9223 19.7385 15.9734 19.652L19.8867 13.0267Z"
        fill="#EC30E4"
      />
    </svg>
  );
}
function FoundingBadge() {
  return (
    <div className="flex-none flex px-2 gap-1 border border-[#E8E8E8] h-[24px] items-center rounded-full">
      <div className="flex-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.55493 14.5342C10.6389 14.1165 13.3333 12.6173 13.3333 8.74081C13.3333 5.21308 10.7511 2.86396 8.89433 1.78458C8.48233 1.54506 8 1.86005 8 2.33662V3.55561C8 4.51685 7.59587 6.27142 6.47288 7.00121C5.89955 7.37381 5.28035 6.81614 5.21067 6.13593L5.15345 5.57737C5.08693 4.92803 4.42561 4.53384 3.90664 4.92974C2.97431 5.64097 2 6.88641 2 8.74081C2 13.4815 5.52593 14.6667 7.28887 14.6667C7.3914 14.6667 7.4992 14.6637 7.6114 14.6572C7.90867 14.6197 7.6114 14.7233 8.55493 14.5342Z"
            fill="url(#paint0_linear_192_54)"
          />
          <path
            d="M5.33331 12.2961C5.33331 14.0427 6.74085 14.5828 7.61138 14.6572C7.90865 14.6197 7.61138 14.7233 8.55491 14.5342C9.24731 14.2895 9.99998 13.6615 9.99998 12.2961C9.99998 11.431 9.45425 10.8973 9.02671 10.6474C8.89591 10.5709 8.74405 10.6672 8.73231 10.8182C8.69525 11.2969 8.23558 11.6783 7.92238 11.3143C7.64565 10.9926 7.52938 10.5227 7.52938 10.2221V9.82928C7.52938 9.59248 7.29098 9.43554 7.08731 9.55641C6.33003 10.0057 5.33331 10.9299 5.33331 12.2961Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_192_54"
              x1="3.16356"
              y1="2.87791"
              x2="13.0006"
              y2="13.4908"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EC30E4" />
              <stop offset="1" stopColor="#581DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="text-[12px] font-medium">Founding 200</div>
    </div>
  );
}
function AmbassadorBadge() {
  return (
    <div className="flex-none flex px-2 gap-1 border border-[#E8E8E8] h-[24px] items-center rounded-full">
      <div className="flex-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_192_84)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.8753 5.59332C12.8753 6.23352 12.7492 6.86744 12.5042 7.4589C12.2592 8.05037 11.9001 8.58778 11.4475 9.04047C10.9948 9.49315 10.4574 9.85224 9.86589 10.0972C9.27443 10.3422 8.6405 10.4683 8.00031 10.4683C7.36012 10.4683 6.72619 10.3422 6.13473 10.0972C5.54327 9.85224 5.00585 9.49315 4.55316 9.04047C4.10048 8.58778 3.74139 8.05037 3.4964 7.4589C3.25141 6.86744 3.12531 6.23352 3.12531 5.59332C3.12531 4.30039 3.63892 3.06042 4.55316 2.14618C5.4674 1.23194 6.70738 0.718323 8.00031 0.718323C9.29324 0.718323 10.5332 1.23194 11.4475 2.14618C12.3617 3.06042 12.8753 4.30039 12.8753 5.59332ZM7.96664 3.06199L8.82998 4.54199L10.31 4.91132L9.32331 6.02132L9.56998 7.74799L7.96664 7.00799L6.36398 7.74799L6.61064 6.02132L5.62398 4.91132L7.10398 4.54132L7.96664 3.06199ZM0.746643 13.1147L3.16264 8.92932C3.61479 9.58606 4.19606 10.1437 4.87096 10.5683C5.54586 10.9929 6.30022 11.2754 7.08798 11.3987L4.75931 15.4313L3.90464 12.2773L0.746643 13.1133V13.1147ZM11.24 15.4313L8.91198 11.398C9.69968 11.2748 10.454 10.9924 11.1289 10.5679C11.8038 10.1435 12.3851 9.58594 12.8373 8.92932L15.2533 13.114L12.0946 12.2773L11.2406 15.4307L11.24 15.4313Z"
              fill="#1EB880"
            />
          </g>
          <defs>
            <clipPath id="clip0_192_84">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="text-[12px] font-medium">Ambassador</div>
    </div>
  );
}
