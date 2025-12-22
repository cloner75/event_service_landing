import CategoryBadge from '@/components/CategoryBadge';
import FormatEventDate from '@/components/FoematEventDate';
import AddIcon from '@/components/icons/add';
import AddFilledIcon from '@/components/icons/add-filled';
import Location2LineIcon from '@/components/icons/location-2-line';
import PhoneIcon from '@/components/icons/phone';
import RightFillIcon from '@/components/icons/right-fill';
import TimeLineIcon from '@/components/icons/time-line';
import WwwIcon from '@/components/icons/www';
import ModalClickable from '@/components/ModalClickable';
import MotionSection from '@/components/MotionSection';
import SafeImage from '@/components/SafeImage';
import SquircleShape from '@/components/SquircleShape';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/location/${slug}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return {
        title: 'Event not found | Dopin',
        description: 'This event does not exist or is private.',
        robots: { index: false, follow: false },
      };
    }

    const data: {
      success: boolean;
      message: string;
      data: any;
    } = await res.json();
    const location = data.data;

    const title = `${location.title} | Dopin`;
    const description = `View ${location.title}'s dopins, moments and events.`;

    const avatarUrl = location.owner.avatar
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${location.owner}?size=small`
      : undefined;

    return {
      title,
      description,

      alternates: {
        canonical: `/location/${slug}`,
      },

      openGraph: {
        title,
        description,
        url: `/location/${slug}`,
        siteName: 'Dopin',
        type: 'article',
        images: avatarUrl
          ? [
              {
                url: avatarUrl,
                width: 400,
                height: 400,
                alt: location.title,
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
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: 'Event | Dopin',
      description: 'Event page on Dopin',
      robots: { index: false, follow: false },
    };
  }
}
export default async function Event({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/location/${slug}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );
  const locationData: {
    success: boolean;
    message: string;
    data: any;
  } = await data.json();
  const location = locationData.data;

  return (
    <MotionSection className="relative">
      <SquircleShape cornerRadius={60}>
        <div className="w-full h-[291px] relative">
          <SafeImage
            alt=""
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${location.snapshot}?size=large`}
            width={646}
            height={291}
            className="w-full block h-full object-cover"
          />
        </div>
        <div className="bg-white p-5 z-1">
          <div className="mt-2">
            <div className="flex justify-center">
              <SafeImage
                alt=""
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${location.owner.avatar}?size=medium`}
                width={64}
                height={64}
                className="w-[64px] rounded-full aspect-square block h-[64px] object-cover"
              />
            </div>
            <div className="justify-center leading-[24px] flex items-center text-[14px] font-semibold text-black">
              {location.title} {location.verified && <VerifyBadge />}
            </div>
            <div className="text-center text-[12px] leading-[12px] font-normal  mt-1 text-[#7A7A7A]">
              {location.address}
            </div>
            <div className="text-center text-[14px] font-normal leading-[14px] text-black mt-3">
              {location.bio ?? ''}
            </div>
            <div className="flex justify-center gap-11.25 mt-6">
              <ModalClickable
                trigger={
                  <div className="text-center flex-none cursor-pointer">
                    <div className="leading-4.75 text-[16px] font-bold">
                      {location.moments.length}
                    </div>
                    <div className="leading-4 text-[12px] font-normal">
                      Moments
                    </div>
                  </div>
                }
                modalName="main"
              />
              <ModalClickable
                trigger={
                  <div className="text-center flex-none cursor-pointer">
                    <div className="leading-4.75 text-[16px] font-bold">
                      {location.event_count ?? 0}
                    </div>
                    <div className="leading-4 text-[12px] font-normal">
                      Events
                    </div>
                  </div>
                }
                modalName="main"
              />
              <ModalClickable
                trigger={
                  <div className="text-center flex-none cursor-pointer">
                    <div className="leading-4.75 text-[16px] font-bold">
                      {location.dopin_count ?? 0}
                    </div>
                    <div className="leading-4 text-[12px] font-normal">
                      Dopins
                    </div>
                  </div>
                }
                modalName="main"
              />
            </div>
          </div>
          <div className="flex gap-2.5 justify-center flex-wrap items-center mt-[15px]">
            <div className="flex-1 max-w-[104px] rounded-[8px] shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]">
              <SquircleShape cornerRadius={8}>
                <Link
                  href={location.website ?? '/'}
                  className="gap-2.5 bg-white w-full flex items-center h-[36px] justify-center "
                >
                  <WwwIcon />
                  <div className="font-semibold text-black text-[12px]">
                    Website
                  </div>
                </Link>
              </SquircleShape>
            </div>
            <div className="flex-1 max-w-[104px] rounded-[8px] shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]">
              <SquircleShape cornerRadius={8}>
                <Link
                  href={`tel:${location.call}`}
                  className="gap-3.5 flex w-full items-center h-[36px] justify-center"
                >
                  <PhoneIcon />
                  <div className="font-semibold text-black text-[12px]">
                    Call
                  </div>
                </Link>
              </SquircleShape>
            </div>
            <div className="flex-1 max-w-[104px] rounded-[8px] shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]">
              <SquircleShape cornerRadius={8}>
                <Link
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.location.coordinates[0]},${location.location.coordinates[1]}`}
                  className="gap-2.5 w-full flex items-center h-[36px] justify-center shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]"
                >
                  <Location2LineIcon />
                  <div className="font-semibold text-black text-[12px]">
                    Direction
                  </div>
                </Link>
              </SquircleShape>
            </div>
          </div>
          <div className=" mt-[30px] ">
            <div className="flex items-center text-black font-semibold text-[20px] leading-[20px]">
              <div className="flex-1">Moments</div>
              <ModalClickable
                trigger={
                  <button className="text-[14px] font-semibold text-[#EC30E4]">
                    See More
                  </button>
                }
                modalName="main"
              />
            </div>
            {location.moments.length == 0 ? (
              <SquircleShape cornerRadius={24} additionalclasses="mt-4 ">
                <div className="w-full  bg-[#F5F5F5] pb-[30px] select-none">
                  <div className="flex justify-center h-[150px]  overflow-visible">
                    <Image
                      className="w-[200px] h-[150px] object-cover aspect-auto"
                      src="/images/no-moment.png"
                      alt=""
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-black text-[16px] leading-4 font-semibold text-center">
                    Open 30 min before start time! 🔥
                  </div>
                  <div className="text-black text-[14px] leading-[14px] font-normal text-center mt-2 ">
                    Get ready — moments unlock soon!
                  </div>
                </div>
              </SquircleShape>
            ) : (
              <div className="flex items-center w-full mt-3 gap-[10px]">
                {location.moments.map((moment: any, i: number) => {
                  return (
                    <div className="flex-1" key={moment.image_id}>
                      <div className="relative">
                        <SafeImage
                          className="w-full h-[180px] object-cover rounded-[21px]"
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${moment.image_id._id}?size=medium`}
                          alt=""
                          width={143}
                          height={180}
                        />
                        <SafeImage
                          className="absolute left-1/2 object-cover bottom-0 translate-y-1/2 -translate-x-1/2 z-2 w-[36px] h-[36px] rounded-[9px] border border-[2px] border-white"
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${moment.owner.avatar}?size=small`}
                          alt=""
                          width={36}
                          height={36}
                        />
                      </div>
                      <div className=" mt-[25px] text-black text-[12px] leading-[12px] font-semibold text-center">
                        {moment.owner.name}
                      </div>
                      <div className="text-[#7A7A7A] text-[10px] font-normal text-center">
                        {moment.created_at}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className=" mt-[20px] z-15">
            <div className="flex items-center text-black font-semibold text-[20px] leading-[20px]">
              <div className="flex-1">
                Dopins ({location.dopins?.length ?? 0})
              </div>
              <ModalClickable
                modalName="main"
                trigger={
                  <button className="w-[86px] px-1.5 gap-1.5 rounded-full border border-[#EC30E4]  h-[36px] flex items-center text-[14px] font-semibold text-black">
                    <AddIcon />
                    New
                  </button>
                }
              />
            </div>
          </div>
          <div className="my-[30px] grid grid-cols-1 gap-2 ">
            {location.dopins && location.dopins.length == 0 ? (
              <div className="h-[200px] flex justify-center items-center">
                <div>
                  <div className="text-center text-[14px] text-black font-bold">
                    No Dopins
                  </div>
                  <div className="text-[14px] text-[#7A7A7A] max-w-[270px] text-center mx-auto">
                    This event hasn’t submit any dopins yet. Check back soon.
                  </div>
                </div>
              </div>
            ) : (
              location.dopins &&
              location.dopins.map((dopin: any) => {
                return (
                  <div
                    className="rounded-[23px] p-5 min-h-[137px] bg-white shadow-[0px_0px_19.5px_rgba(0,0,0,0.05)]"
                    key={dopin._id}
                  >
                    <div className="flex ">
                      <div className="flex-1">
                        <div className="flex gap-1.5">
                          <div className="relative h-fit">
                            <SafeImage
                              className="rounded-[12px] w-[36px] h-[36px]"
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${dopin.owner.avatar}?size=small`}
                              alt=""
                              width={36}
                              height={36}
                            />
                            <div className="absolute left-full top-full translate-x-[-15px] translate-y-[-15px]">
                              <AddFilledIcon />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-[2px]">
                            <div className="text-[14px] leading-[14px] font-bold max-w-[175px]">
                              {dopin.title}
                            </div>
                            <div className="text-[12px] text-black gap-1 flex items-center ">
                              <TimeLineIcon fill="black" />
                              <FormatEventDate
                                endedAt={dopin.end_date}
                                startedAt={dopin.start_date}
                                justHours={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2.5 flex text-[#7A7A7A] items-center gap-1 text-[12px] max-w-[175px]">
                          Started by
                          <Link
                            href={`/profile/${dopin.owner._id}`}
                            className="text-[#581DFF] font-semibold"
                          >
                            {dopin.owner.name}
                          </Link>
                        </div>
                        <div className="mt-2">
                          <CategoryBadge
                            emoji={dopin.emoji}
                            icon={dopin.icon}
                            text={dopin.category.title}
                          />{' '}
                        </div>
                        <div className=" mt-2">
                          <Link
                            href={`/dopin`}
                            className="transition hover:shadow-[0px_0px_20px_rgba(0,0,0,0.2)] bg-[linear-gradient(140.98deg,#EC30E4_9.6%,#581DFF_93.68%)] text-[14px] font-semibold rounded-full w-[82px] h-[32px] gap-1.5 text-white flex items-center justify-end pr-2"
                          >
                            Join
                            <RightFillIcon />
                          </Link>
                        </div>
                      </div>
                      <div className="flex-none">
                        <SquircleShape
                          additionalclasses="mt-[-35px] transition rotate-[2.79deg] w-[110px] h-[138px]"
                          cornerRadius={24}
                        >
                          <SafeImage
                            height={138}
                            width={110}
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${dopin.owner.avatar}?size=medium`}
                            alt=""
                            className="object-cover w-[110px] h-[138px] overflow-hidden"
                          />
                        </SquircleShape>
                        <p className="text-center leading-[10px] text-[10px] font-semibold mt-4">
                          {dopin.users.length} Member
                        </p>
                        <div className="flex justify-center items-center w-full mt-1">
                          {dopin.users.map((user: any, i: number) => {
                            return (
                              <SafeImage
                                key={i}
                                style={{ zIndex: 10 - (i + 1) }}
                                className=" rounded-full border border-[3px] ml-[-5px] overflow-hidden border-white"
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${user.avatar}?size=medium`}
                                alt=""
                                width={19}
                                height={19}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </SquircleShape>
    </MotionSection>
  );
}

function VerifyBadge() {
  return (
    <svg
      width="24"
      height="24"
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
