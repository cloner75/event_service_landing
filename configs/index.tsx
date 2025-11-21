export const CARDS_MODE = process.env.NEXT_PUBLIC_CARDS_MODE;

export const SLIDE_DURATION = process.env.NEXT_PUBLIC_SLICE_DURATION;

export const HOME_VIDEO_PATH = `/videos/${process.env.NEXT_PUBLIC_VIDEO_NAME}`;

export const SLICE_IMAGES =
  process.env.NEXT_PUBLIC_SLIDE_IMAGES?.split(",") || [];

export const IMAGE_WITH_PINS = process.env.NEXT_PUBLIC_IMAGE_WITH_PINS_ON_IT;
