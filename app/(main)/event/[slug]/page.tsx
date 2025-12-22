import CategoryBadge from '@/components/CategoryBadge';
import FormatEventDate from '@/components/FoematEventDate';
import AddIcon from '@/components/icons/add';
import AddFilledIcon from '@/components/icons/add-filled';
import DateSolidIcon from '@/components/icons/date-solid';
import LocationIcon from '@/components/icons/location';
import RightFillIcon from '@/components/icons/right-fill';
import TimeLineIcon from '@/components/icons/time-line';
import UserCheckOutlineIcon from '@/components/icons/user-check-outline';
import ModalClickable from '@/components/ModalClickable';
import MotionSection from '@/components/MotionSection';
import SafeImage from '@/components/SafeImage';
import ShareButton from '@/components/ShareButton';
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/event/${slug}`,
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
    const event = data.data;

    const title = `${event.name} | Dopin`;
    const description = `View ${event.name}'s dopins and location.`;

    const avatarUrl = `/images/Dopin.svg`;

    return {
      title,
      description,

      alternates: {
        canonical: `/event/${slug}`,
      },

      openGraph: {
        title,
        description,
        url: `/event/${slug}`,
        siteName: 'Dopin',
        type: 'article',
        images: avatarUrl
          ? [
              {
                url: avatarUrl,
                width: 400,
                height: 400,
                alt: event.name,
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/event/${slug}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );
  const eventData: {
    success: boolean;
    message: string;
    data: any;
  } = await data.json();
  const event = eventData.data;

  return (
    <MotionSection className="relative">
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

      <SquircleShape cornerRadius={60}>
        <div className="bg-white p-5 z-1">
          <div className="flex  mt-2">
            <div className="flex flex-1 flex-nowrap ml-3 items-center h-full">
              <div className="flex-1 ">
                <div className="text-[24px] font-bold text-[#111] flex items-center">
                  {event.title}
                </div>
                <div className="text-[14px] font-normal text-[#7A7A7A] flex items-center gap-2">
                  <DateSolidIcon width={24} height={24} />
                  <FormatEventDate
                    endedAt={event.ended_at}
                    startedAt={event.started_at}
                  />
                </div>
                <div className="flex gap-[20px]">
                  <div className="text-[14px] font-normal text-[#7A7A7A] flex items-center gap-2">
                    <LocationIcon width={24} height={24} />
                    {event.location_ref.address}
                  </div>
                  <div className="text-[14px] font-normal text-[#7A7A7A] flex items-center gap-2">
                    <UserCheckOutlineIcon />
                    Added by users
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-none flex gap-3">
              {event.rsvp && (
                <Image
                  draggable={false}
                  src={`/images/rsvp.png`}
                  alt=""
                  width={92}
                  height={40}
                  className=""
                />
              )}
              <ShareButton />
            </div>
          </div>

          <div className=" mt-4 ">
            <div className="shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)] rounded-[24px]">
              <SquircleShape cornerRadius={24}>
                <Image
                  draggable={false}
                  className=" w-full h-auto "
                  src="/images/event-map.png"
                  alt=""
                  width={606}
                  height={202}
                />
              </SquircleShape>
            </div>
          </div>
          <div className=" mt-[20px] z-15">
            <div className="flex items-center text-black font-semibold text-[20px] leading-[20px]">
              <div className="flex-1">Dopins ({event.dopins.length})</div>
              <ModalClickable
                modalName="dopin"
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
            {event.dopins.map((dopin: any) => {
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
                        />
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
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${dopin.cover}?size=medium`}
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
            })}

            {event.dopins.length == 0 && (
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
            )}
          </div>
        </div>
      </SquircleShape>
    </MotionSection>
  );
}
