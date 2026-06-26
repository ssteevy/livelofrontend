"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type LottieData = Record<string, unknown>;

export function LottiePlayer({ src, className = "" }: { src: string; className?: string }) {
  const [data, setData] = useState<LottieData | null>(null);

  useEffect(() => {
    let active = true;
    fetch(src)
      .then((response) => response.json())
      .then((json: LottieData) => {
        if (active) setData(json);
      })
      .catch(() => {
        if (active) setData(null);
      });
    return () => {
      active = false;
    };
  }, [src]);

  if (!data) return <div className={className} aria-hidden="true" />;

  return <Lottie animationData={data} loop autoplay className={className} aria-hidden="true" />;
}
