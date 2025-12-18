import FormatEventDate from '@/components/FoematEventDate';
import BuildingFillIcon from '@/components/icons/building-fill';
import DateSolidIcon from '@/components/icons/date-solid';
import LocationIcon from '@/components/icons/location';
import Location2LineIcon from '@/components/icons/location-2-line';
import PhoneIcon from '@/components/icons/phone';
import PublicIcon from '@/components/icons/public';
import TimeLineIcon from '@/components/icons/time-line';
import WwwIcon from '@/components/icons/www';
import ModalClickable from '@/components/ModalClickable';
import MotionSection from '@/components/MotionSection';
import ShareButton from '@/components/ShareButton';
import SquircleShape from '@/components/SquircleShape';
import { DopinResponse } from '@/Dto/dopin-dto';
import { EventResponse } from '@/Dto/event-dto';
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/dopin/${slug}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return {
        title: 'Dopin not found | Dopin',
        description: 'This dopin does not exist or is private.',
        robots: { index: false, follow: false },
      };
    }

    const data: DopinResponse = await res.json();
    const dopin = data.data;

    const title = `Dopin | Dopin`;
    const description = `View ${dopin.name}'s moments and members.`;

    const avatarUrl = dopin.owner.avatar
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${dopin.avatar}?size=small`
      : undefined;

    return {
      title,
      description,

      alternates: {
        canonical: `/dopin/${slug}`,
      },

      openGraph: {
        title,
        description,
        url: `/dopin/${slug}`,
        siteName: 'Dopin',
        type: 'profile',
        images: avatarUrl
          ? [
              {
                url: avatarUrl,
                width: 400,
                height: 400,
                alt: dopin.name,
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
        index: dopin.is_public,
        follow: dopin.is_public,
      },
    };
  } catch {
    return {
      title: 'Dopin | Dopin',
      description: 'Dopin page on Dopin',
      robots: { index: false, follow: false },
    };
  }
}
export default async function Dopin({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/dopin/${slug}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );
  const dopinData: DopinResponse = await data.json();
  const dopin = dopinData.data;

  const eventRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/event/${dopin.event._id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );
  const eventData: EventResponse = await eventRes.json();
  const event = eventData.data;
  console.log(dopin);
  console.log(event);
  return (
    <MotionSection className="relative">
      <SquircleShape
        additionalclasses="absolute pointer-events-none z-3 w-full h-71.75  bottom-0 left-0 "
        bottomLeftCornerRadius={58}
        bottomRightCornerRadius={58}
      >
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)0%,#FFFFFF_92.28%)] w-full h-71.75"></div>
      </SquircleShape>
      <ModalClickable
        modalName="main"
        trigger={
          <div className="absolute z-4 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-[17px] inline-block">
            <SquircleShape cornerRadius={17}>
              <button
                type="button"
                className="w-[228px] bg-[#581DFF] hover:opacity-95 text-[16px]  text-white font-medium px-8 py-3 transition"
              >
                Show more
              </button>
            </SquircleShape>
          </div>
        }
      />
      <SquircleShape cornerRadius={60}>
        <div className=" bg-white p-5 z-1 rounded-[60px]">
          <div className="flex flex-nowrap gap-5 ">
            <div className="flex-none h-fit ">
              <SquircleShape cornerRadius={40}>
                <Image
                  draggable={false}
                  height={136}
                  width={136}
                  src={`https://dopin-backend-qpxxo.ondigitalocean.app/v1/public/file/6928427b82d66cef8c1e5b76?size=medium`}
                  alt=""
                  className="w-34 img-skeleton bg-gray-400 aspect-square object-cover overflow-hidden"
                />
              </SquircleShape>
            </div>
            <div className="flex-1 ">
              <div className="flex">
                <div>
                  <div className="text-black font-black max-w-[335px] text-[24px] leading-7.25">
                    {dopin.title}
                  </div>
                  <div className="mt-2 text-[#7A7A7A] flex items-center font-normal text-[12px]">
                    <TimeLineIcon /> &nbsp;{' '}
                    <FormatEventDate
                      endedAt={dopin.end_date}
                      startedAt={dopin.start_date}
                    />
                  </div>
                  <div className="mt-2">
                    {dopin.is_public && <PublicBadge />}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-none">
              <ModalClickable modalName="dopin" trigger={<ShareButton />} />
            </div>
          </div>
          <div className=" mt-[10px] w-[136px]">
            <div className=" text-center text-[#7A7A7A] font-normal text-[14px] leading-[17px]">
              Dopiner:
            </div>
            <Link
              href={`/profile/${dopin.owner._id}`}
              className="mt-[8px] block text-center text-[#581DFF] font-semibold text-[24px] leading-[24px]"
            >
              {dopin.owner.name}
            </Link>
          </div>
          <div className=" mt-[30px] ">
            <div className=" text-black font-semibold text-[20px] leading-[20px]">
              About Dopin
            </div>
            <div className="mt-[8px] max-w-[449px] font-normal text-[16px] leading-[16px]">
              {dopin.description}
            </div>
          </div>
          <div className=" mt-[30px] ">
            <div className=" text-black font-semibold text-[20px] leading-[20px]">
              {dopin.users.length} Members
            </div>
            <div className="flex items-center w-full mt-1">
              {dopin.users.map((user: any, i: number) => {
                if (dopin.users.length - 1 == i && dopin.users.length != 1)
                  return (
                    <ModalClickable
                      key={i}
                      modalName="dopin"
                      trigger={
                        <button
                          style={{ zIndex: 10 - i }}
                          className="w-[101px] gap-1.5 flex items-center shadow-[0px_4px_17.9px_rgba(0,0,0,0.14)] rounded-full border border-[3px] ml-[-10px] overflow-hidden border-white"
                        >
                          <Image
                            draggable={false}
                            className="img-skeleton border border-[3px] border-white rounded-full"
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${user.avatar}?size=small`}
                            alt=""
                            width={40}
                            height={40}
                          />
                          <span className="text-[12px] font-bold">See all</span>
                        </button>
                      }
                    />
                  );
                return (
                  <div
                    key={i}
                    style={{ zIndex: 10 - i }}
                    className="rounded-full border border-[3px] ml-[-10px] overflow-hidden border-white"
                  >
                    <Image
                      draggable={false}
                      className="img-skeleton"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${user.avatar}?size=small`}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                );
              })}
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
                modalName="dopin"
              />
            </div>
            {dopin.moments.length == 0 ? (
              <SquircleShape cornerRadius={24} additionalclasses="mt-4 ">
                <div className="w-full  bg-[#F5F5F5] pb-[30px] select-none">
                  <div className="flex justify-center h-[150px]  overflow-visible">
                    <Image
                      draggable={false}
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
                    Get ready — moments unlock soon!{' '}
                  </div>
                </div>
              </SquircleShape>
            ) : null}
            <div className="flex items-center w-full mt-3 gap-[10px]">
              {dopin.moments.map((moment: any, i: number) => {
                return (
                  <div className="flex-1" key={moment.image_id}>
                    <div className="relative">
                      <Image
                        draggable={false}
                        className="w-full h-[180px] object-cover rounded-[21px]"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${moment.image_id}?size=medium`}
                        alt=""
                        width={143}
                        height={180}
                      />
                      <Image
                        draggable={false}
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
          </div>
          <div className="flex flex-nowrap mt-[30px] gap-[20px]">
            <div className="w-[60%]">
              <div className="shadow-[0px_4px_18px_rgba(0,0,0,0.15)] rounded-[24px]">
                <SquircleShape cornerRadius={24}>
                  <div className="px-5 py-1.5 min-h-[81px] bg-white">
                    <div className="flex flex-nowrap items-center h-full">
                      <div className="flex-1 ">
                        <div className="text-[14px] max-w-[200px] font-bold text-[#111] flex items-center">
                          {event.title}
                        </div>
                        <div className="text-[10px] font-normal text-[#7A7A7A] flex items-center gap-2">
                          <DateSolidIcon />
                          <FormatEventDate
                            endedAt={dopin.event.ended_at}
                            startedAt={dopin.event.started_at}
                          />
                        </div>
                        <div className="text-[12px] font-normal text-[#7A7A7A] flex items-center gap-2">
                          <LocationIcon />
                          {dopin.event.address}
                        </div>
                      </div>
                      {dopin.event.rsvp != null ? (
                        <Image
                          draggable={false}
                          src={`/images/rsvp.png`}
                          alt=""
                          width={92}
                          height={40}
                          className="flex-initial"
                        />
                      ) : undefined}
                    </div>
                  </div>
                </SquircleShape>
              </div>
              <div className="shadow-[0px_4px_18px_rgba(0,0,0,0.15)] rounded-[24px]">
                <SquircleShape cornerRadius={24}>
                  <div className="px-5 py-1.5 flex items-center min-h-[121px] mt-[15px]">
                    <div className="flex-1">
                      <div className="flex gap-4 items-center ">
                        <div className="flex-none">
                          <div className="w-[38px] h-[38px] rounded-full aspect-square flex items-center justify-center bg-[#E7E7E7] border border-[rgba(217,217,217,0.23)]">
                            <BuildingFillIcon />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-black text-[14px]">
                            {event.location_ref.address}
                          </div>
                          <div className="font-semibold text-[#7A7A7A] text-[12px]">
                            {event.location_ref.country},{' '}
                            {event.location_ref.state} ,{' '}
                            {event.location_ref.city},{' '}
                            {event.location_ref.zipcode}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2.5 flex-wrap items-center mt-[15px]">
                        <div className="flex-1 rounded-[8px] shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]">
                          <SquircleShape cornerRadius={8}>
                            <Link
                              href={'/'}
                              className="gap-2.5 bg-white w-full flex items-center h-[36px] justify-center "
                            >
                              <WwwIcon />
                              <div className="font-semibold text-black text-[12px]">
                                Website
                              </div>
                            </Link>
                          </SquircleShape>
                        </div>
                        <div className="flex-1 rounded-[8px] shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]">
                          <SquircleShape cornerRadius={8}>
                            <Link
                              href={`tel:${event.location_ref.call}`}
                              className="gap-2.5 flex w-full items-center h-[36px] justify-center"
                            >
                              <PhoneIcon />
                              <div className="font-semibold text-black text-[12px]">
                                Phone
                              </div>
                            </Link>
                          </SquircleShape>
                        </div>
                        <div className="flex-1 rounded-[8px] shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)]">
                          <SquircleShape cornerRadius={8}>
                            <Link
                              href={`https://www.google.com/maps/dir/?api=1&destination=${event.location_ref.location.coordinates[0]},${event.location_ref.location.coordinates[1]}`}
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
                    </div>
                  </div>
                </SquircleShape>
              </div>
            </div>

            <div className="w-[40%] flex-none rounded-3xl shadow-[0px_4px_16.1px_rgba(0,0,0,0.1)] h-[218px] w-full max-w-[227px] overflow-hidden">
              <SquircleShape
                additionalclasses="h-full w-full max-w-[227px]"
                cornerRadius={24}
              >
                <Image
                  draggable={false}
                  src="/images/dopin-map-1.png"
                  alt=""
                  height={218}
                  width={227}
                  className="object-cover w-full h-full"
                />
              </SquircleShape>
            </div>
          </div>
        </div>
      </SquircleShape>
    </MotionSection>
  );
}

function PublicBadge() {
  return (
    <span className="px-2 gap-1.5 h-[24px] inline-flex w-auto items-center rounded-[6px] border border-[#E8E8E8]">
      <PublicIcon />
      <span className="text-black text-[12px] font-medium">Public</span>
    </span>
  );
}
