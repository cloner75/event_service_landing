import Image from "next/image";
import useWindowWidth from "@/hooks/useWindowWidth";

function DownloadApp({ hideBadgeOnMobile }: { hideBadgeOnMobile?: boolean }) {
  const screenWidth = useWindowWidth();

  const width = screenWidth < 768 ? 162 : 261;
  const height = screenWidth < 768 ? 61 : 96;

  return (
    <a target="_blank" href={process.env.NEXT_PUBLIC_APP_DOWNLOAD_LINK}>
      <>
        <Image
          className={`${hideBadgeOnMobile ? "hidden md:block" : ""}`}
          alt="download"
          width={width}
          height={height}
          src="images/apple_link_with_badge.svg"
        />

        <Image
          className={`${hideBadgeOnMobile ? "md:hidden" : "hidden"}`}
          width={261}
          height={96}
          alt="download"
          src="/images/apple_link.svg"
        />
      </>
    </a>
  );
}

export default DownloadApp;
