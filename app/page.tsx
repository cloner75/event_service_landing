import Image from "next/image";
import DownloadApp from "@/components/DownloadApp";

const QUOTES = [
  {
    imgName: "alic.jpg",
    title: "Alic",
    quote:
      "Loved the energy. The chat before the event helped me feel comfortable joining!",
    style: "top-[90%] left-[15%] md:top-0 md:left-[-200px]",
  },
  {
    imgName: "roby.jpg",
    title: "Roby",
    quote:
      "It’s crazy how easy it was to find friends with similar interests here.",
    style: "top-[140%] left-[35%] md:top-[280px] md:left-[-120px]",
  },
  {
    imgName: "samantha.jpg",
    title: "Samantha",
    quote: "Met my new favorite crew here. Dopin works!",
    style: "top-[180%] left-[15%] md:top-[600px] md:left-[-180px]",
  },
  {
    imgName: "Darrius.jpg",
    title: "Darrius",
    quote: "Good people, chill atmosphere. Can’t wait for the next one.",
    style: "hidden md:flex top-[50px] right-[-30%]",
  },
  {
    imgName: "Vinh.jpg",
    title: "Vinh",
    quote:
      "Everything was smooth — joined the chat, met up, and had an awesome night.",
    style: "hidden md:flex top-[300px] right-[-20%]",
  },
  {
    imgName: "Vinh_2.jpg",
    title: "Vinh",
    quote: "So fun! We ended up hanging out even after the event ended.",
    style: "hidden md:flex top-[600px] right-[-300px]",
  },
];

function PersonImage({
  imgName,
  style = "",
}: {
  imgName: string;
  style?: string;
}) {
  return (
    <div
      className={`absolute w-[57px] h-[57px] rounded-[16px] md:rounded-[30px] md:h-[100px] md:w-[100px] overflow-hidden ${style}`}
    >
      <Image
        src={`/images/people/${imgName}`}
        alt=""
        fill
        className="object-cover"
      />
    </div>
  );
}

function PersonWithQuote({
  imgName,
  title,
  quote,
  style = "",
}: {
  imgName: string;
  title: string;
  quote: string;
  style?: string;
}) {
  return (
    <div className={`absolute z-100000 flex flex-col ${style}`}>
      <div
        className={`relative w-[57px] h-[57px] rounded-[16px] lg:rounded-[30px] lg:h-[100px] lg:w-[100px] overflow-hidden`}
      >
        <Image
          src={`/images/people/${imgName}`}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col pl-[10px]">
        <h5 className="text-[24px] font-[700]">{title}</h5>
        <p className="text-[14px] font-regular max-w-[40%] lg:max-w-[314px]">{quote}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="leading-tight">
      <section className="relative">
        <PersonImage
          style="absolute top-[-50px] right-[30px] md:right-[-160px] md:top-[760px]"
          imgName="p_1.jpg"
        />
        <PersonImage
          style="absolute top-[-50px] left-[30px] md:top-[330px] md:left-[-260px]"
          imgName="p_2.jpg"
        />
        <PersonImage
          style="absolute top-[150px] left-[40px] md:left-[-160px] md:top-[760px]"
          imgName="p_3.jpg"
        />
        <PersonImage
          style="absolute top-[250px] left-[40px] md:left-[10px] md:top-[430px]"
          imgName="p_4.jpg"
        />
        <PersonImage
          style="absolute top-[250px] right-[40px] md:right-[20px] md:top-[430px]"
          imgName="p_5.jpg"
        />
        <PersonImage
          style="absolute top-[150px] right-[10px] md:right-[-80px] md:top-[230px]"
          imgName="p_6.jpg"
        />

        <div className="flex my-[80px] md:my-[0px] flex-col items-center">
          <div
            className={
              "relative w-[249px] h-[89px] md:w-[724px] md:h-[257px] overflow-hidden"
            }
          >
            <Image
              src={`/images/Dopin.svg`}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-center text-[24px] md:text-[64px] font-[860]">
            Dopins are just beginning
          </h3>
          <h5 className="text-[14px] md:text-[32px]">
            Where Every Location Has a Story
          </h5>

          <DownloadApp />
        </div>

        <div className="flex justify-center gap-[59px] items-end">
          <div className="absolute mb-9 left-[-50px] sm:static w-[120px] h-[258px] rounded-[15px] md:w-[252px] md:h-[546px] md:rounded-[30px] bg-[url('/images/Home_left.png')] bg-cover"></div>
          <div className="relative shadow-[0px_4px_147.1px_0px_#00000040] w-[186px] h-[402px] rounded-[32px] md:w-[376px] md:h-[814px] md:rounded-[47px] bg-[url('/images/Home_2.png')] bg-cover"></div>
          <div className="absolute mb-9 right-[-50px] sm:static w-[120px] h-[258px] rounded-[15px] md:w-[252px] md:h-[546px] md:rounded-[30px] bg-[url('/images/Home_right.png')] bg-cover"></div>
        </div>
      </section>

      <section className="relative">
        <div className="flex flex-col">
          <h2 className="text-center max-w-[300px] md:max-w-[900px] mx-auto text-[48px] mt-[160px] md:text-[96px] font-[860]">
            Connect Beyond the Moments
          </h2>

          <div className="relative">
            <div className="flex justify-center h-[412px] md:h-[785px] relative">
              <div className="absolute z-20 w-[281px] h-[412px] md:w-[535px] md:h-[783px] rounded-[47px] bg-[url('/images/friends.jpg')] bg-cover"></div>
              <div className="absolute z-1 w-[265px] h-[371px] md:w-[505px] bg-no-repeat md:h-[705px] rotate-[3.46deg] bg-[#DBDBDB] right-[18%] bottom-[0px] rounded-[62px]"></div>
              <div className="absolute z-2 bg-[#E5E5E5] w-[265px] h-[371px] bg-no-repeat md:w-[505px] md:h-[705px] rotate-[-7.54deg] left-[18%] bottom-[0px] rounded-[62px]"></div>
            </div>

            {QUOTES.map((q) => (
              <PersonWithQuote
                key={q.imgName}
                imgName={q.imgName}
                title={q.title}
                quote={q.quote}
                style={q.style}
              />
            ))}
          </div>

          <div className="flex mt-[500px] md:mt-[80px] flex-col items-center">
            <h2 className="text-center max-w-[310px] md:max-w-[790px] text-[64px] font-[860]">
              Your City’s Stories, Your New Friends.
            </h2>
            <DownloadApp hideBadgeOnMobile={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
