import DopinPageVerifyBadge from '@/components/DopinPageVerifyBadge';
import FormatEventDate from '@/components/FoematEventDate';
import BuildingFillIcon from '@/components/icons/building-fill';
import DateSolidIcon from '@/components/icons/date-solid';
import LocationIcon from '@/components/icons/location';
import Location2LineIcon from '@/components/icons/location-2-line';
import MusicIcon from '@/components/icons/music';
import PhoneIcon from '@/components/icons/phone';
import PublicIcon from '@/components/icons/public';
import TimeLineIcon from '@/components/icons/time-line';
import WwwIcon from '@/components/icons/www';
import ModalClickable from '@/components/ModalClickable';
import MotionSection from '@/components/MotionSection';
import SafeImage from '@/components/SafeImage';
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

    const title = `${dopin.title} | Dopin`;
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

  return (
    <MotionSection className="relative">
      <ModalClickable
        modalName="main"
        trigger={
          <div className="absolute z-4 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-[17px] inline-block">
            <SquircleShape cornerRadius={17}>
              <button
                type="button"
                className="w-[228px] bg-[#581DFF] hover:opacity-95 text-[16px]  text-white font-medium px-8 py-3 transition"
              >
                join
              </button>
            </SquircleShape>
          </div>
        }
      />
      <SquircleShape cornerRadius={60}>
        <div className=" bg-white p-5 pb-[50px] z-1 rounded-[60px]">
          <div className=" shadow-[0px_8px_10.6px_rgba(0,0,0,0.04)] -mx-5 -mt-5 rounded-[70px]">
            <SquircleShape
              cornerRadius={60}
              additionalclasses="flex flex-nowrap gap-3 px-8 pt-8 pb-10"
            >
              <div className="flex-1 ">
                <div className="flex">
                  <div>
                    <div className="text-black font-black max-w-[335px] text-[24px] leading-7.25">
                      {dopin.title}
                    </div>
                    <div className="mt-2 text-black flex items-center font-medium text-[12px]">
                      <TimeLineIcon fill="black" /> &nbsp;
                      <FormatEventDate
                        endedAt={dopin.end_date}
                        startedAt={dopin.start_date}
                        justHours
                      />
                    </div>

                    {dopin.is_public && (
                      <div className="mt-2">
                        <PublicBadge />
                      </div>
                    )}

                    {dopin.is_concert && (
                      <div className="mt-1.5">
                        <ConcertsBadge text={dopin.category.title} />
                      </div>
                    )}
                    <div className="mt-2">
                      <PublicBadge />
                    </div>
                    <div className="mt-1.5">
                      <ConcertsBadge text={dopin.category.title} />
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      <div className="flex-none">
                        <SquircleShape cornerRadius={12}>
                          <SafeImage
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${dopin.owner.avatar}?size=small`}
                            width={32}
                            height={32}
                          />
                        </SquircleShape>
                      </div>
                      <div className="flex-1 ">
                        <div className="leading-[14px] overflow-hidden flex flex-wrap items-center text-[14px] text-[#581DFF] font-semibold">
                          <div className="flex-1">{dopin.owner.name}</div>
                          {dopin.owner.is_verified && <DopinPageVerifyBadge />}
                        </div>
                        <div className="text-[12px] text-[#7A7A7A]">
                          {dopin.owner.bio}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-none ">
                <SquircleShape
                  additionalclasses="transition rotate-[2.79deg] w-[130px] xs:w-[180px] h-[162px] xs:h-[225px]"
                  cornerRadius={36}
                >
                  <SafeImage
                    height={225}
                    width={180}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${dopin.owner.avatar}?size=medium`}
                    alt=""
                    className="object-cover w-[130px] xs:w-[180px] overflow-hidden"
                  />
                </SquircleShape>
              </div>
              <div className="flex-none ">
                <ModalClickable modalName="dopin" trigger={<ShareButton />} />
              </div>
            </SquircleShape>
          </div>

          <div className=" mt-[30px] ">
            <div className=" text-black font-semibold text-[20px] leading-[20px]">
              About Dopin
            </div>
            <div className="mt-[8px] max-w-[449px] font-normal text-[16px] leading-[16px]">
              {dopin.description}
            </div>
          </div>
          <div className=" mt-[20px] ">
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
                          style={{
                            zIndex: 10 - i,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderTopRightRadius: 40,
                            borderBottomRightRadius: 40,
                          }}
                          className="w-[101px] h-[44px] ml-[-10px] gap-1.5 flex items-center shadow-[0px_4px_17.9px_rgba(0,0,0,0.14)]"
                        >
                          <div className="flex-none">
                            <SquircleShape
                              cornerRadius={12}
                              additionalclasses="w-[44px] h-[44px]"
                            >
                              <div className="w-full h-full flex justify-center items-center">
                                <SquircleShape
                                  cornerRadius={12}
                                  additionalclasses="w-[39px] h-[39px]"
                                >
                                  <SafeImage
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${user.avatar}?size=small`}
                                    alt=""
                                    width={40}
                                    height={40}
                                  />
                                </SquircleShape>
                              </div>
                            </SquircleShape>
                          </div>
                          <span className="text-[12px] font-bold">See all</span>
                        </button>
                      }
                    />
                  );
                return (
                  <div key={i} style={{ zIndex: 10 - i }}>
                    <SquircleShape
                      cornerRadius={13}
                      additionalclasses={`bg-white w-[43px] h-[43px] ${
                        i != 0 && 'ml-[-10px]'
                      }`}
                    >
                      <div className="w-full h-full flex justify-center items-center">
                        <SquircleShape
                          cornerRadius={12}
                          additionalclasses="w-[39px] h-[39px]"
                        >
                          <SafeImage
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${user.avatar}?size=small`}
                            alt=""
                            width={39}
                            height={39}
                          />
                        </SquircleShape>
                      </div>
                    </SquircleShape>
                  </div>

                  // <div
                  //   key={i}
                  //   style={{ zIndex: 10 - i }}
                  //   className="rounded-full border border-[3px] ml-[-10px] overflow-hidden border-white"
                  // >
                  //   <SafeImage
                  //     src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${user.avatar}?size=small`}
                  //     alt=""
                  //     width={40}
                  //     height={40}
                  //   />
                  // </div>
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
                      <SafeImage
                        className="w-full h-[180px] object-cover rounded-[21px]"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${moment.image_id}?size=medium`}
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
          </div>
          <div className="flex flex-nowrap mt-[30px] gap-[20px]">
            <div className="w-[60%]">
              <div className="shadow-[0px_4px_18px_rgba(0,0,0,0.15)] rounded-[24px]">
                <SquircleShape cornerRadius={24}>
                  <div className="px-5 py-1.5 min-h-[81px] bg-white flex flex-nowrap items-center h-full">
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
                    {dopin.event.status == 'active' ? (
                      <Image
                        draggable={false}
                        src={`/images/tickets.png`}
                        alt=""
                        width={104}
                        height={40}
                        className="flex-none"
                      />
                    ) : undefined}
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
function ConcertsBadge({ text }: { text: string }) {
  return (
    <span className="px-2 gap-1.5 h-[24px] inline-flex items-center rounded-[6px] border border-[#E8E8E8]">
      <MusicIcon />
      <span className="text-black text-[12px] font-medium">{text}</span>
    </span>
  );
}
