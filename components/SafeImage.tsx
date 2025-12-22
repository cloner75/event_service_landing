'use client';

import Image from 'next/image';
import { useState } from 'react';

type SafeImageProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  style?: any;
};

export default function SafeImage({
  src,
  alt = '',
  width,
  height,
  className,
  style,
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        width,
        height,
        ...style,
      }}
      className={className + ' relative overflow-hidden '}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
      {!error && (
        <Image
          draggable={false}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${
            loaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(false);
          }}
        />
      )}
    </div>
  );
}
