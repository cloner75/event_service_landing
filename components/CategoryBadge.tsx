import SafeImage from './SafeImage';

export default function CategoryBadge({
  icon,
  emoji,
  text,
}: {
  icon?: string;
  emoji: string;
  text: string;
}) {
  return (
    <span className="px-2 gap-1.5 h-[24px] inline-flex items-center rounded-[6px] border border-[#E8E8E8]">
      {icon ? (
        <SafeImage
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/public/file/${icon}?size=small`}
          alt=""
          height={16}
          width={16}
          className="object-cover aspect-square w-full h-full"
        />
      ) : (
        emoji
      )}
      <span className="text-black text-[12px] font-medium">{text}</span>
    </span>
  );
}
