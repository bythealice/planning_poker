import type { ImgHTMLAttributes } from "react";

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  alt: string;
  height?: number;
  priority?: boolean;
  src: string | { src: string };
  width?: number;
};

export default function NextImage({ src, alt, ...props }: NextImageProps) {
  const resolvedSrc = typeof src === "string" ? src : src.src;

  /* eslint-disable @next/next/no-img-element */
  return <img alt={alt} src={resolvedSrc} {...props} />;
}

