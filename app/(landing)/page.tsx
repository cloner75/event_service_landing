"use client";

import DownloadApp from "@/components/DownloadApp";
import PeopleGroup from "@/components/PeopleGroup";
import HomeImages from "@/components/HomeImages";
import FriendsStack from "@/components/FriendsStack";
import FriendsTitle from "@/components/FriendsTitle";
import IntroCollection from "@/components/IntroCollection";
import PersonQuotes from "@/components/PersonQuotes";

export default function Home() {
  return (
    <div className="leading-tight home_page overflow-hidden sm:overflow-visible">
      <section className="relative">
        <IntroCollection />

        <HomeImages />
      </section>

      <section className="relative">
        <div className="flex flex-col">
          <FriendsTitle />

          <div className="relative">
            <FriendsStack />

            <PersonQuotes />
          </div>

          <div className="flex gap-6 mt-[700px] lg:mt-[250px] flex-col items-center">
            <h2 className="text-center text-[#FFFFFF] max-w-[310px] lg:max-w-[790px] text-[64px] font-[860]">
              Your City’s Stories, Your New Friends.
            </h2>
            <DownloadApp hideBadgeOnMobile={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
