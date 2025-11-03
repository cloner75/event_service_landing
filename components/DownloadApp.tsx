import Image from "next/image";

function DownloadApp({ hideBadgeOnMobile }: { hideBadgeOnMobile?: boolean }) {
  return (
    <a target="_blank" href={process.env.NEXT_PUBLIC_APP_DOWNLOAD_LINK}>
      <>
        <Image
          className={`${hideBadgeOnMobile ? "hidden md:block" : ""}`}
          alt="download"
          width={261}
          height={96}
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
