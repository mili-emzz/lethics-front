import React from "react";
import Link from "next/link";

interface LethicsLogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export function LethicsLogo({ href = "/", size = "md" }: LethicsLogoProps) {
  const iconSizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11 md:h-[54px] md:w-[54px]",
    lg: "h-12 w-12 md:h-[59px] md:w-[58px]"
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl md:text-[36px]",
    lg: "text-3xl md:text-[40px]"
  };

  return (
    <Link href={href} className="inline-flex items-end gap-2 group select-none">
      {/* Espacio en blanco reservado para el isotipo (imagen de logo) */}
      <div
        aria-hidden="true"
        className={`${iconSizes[size]} shrink-0 rounded-full bg-white border border-dashed border-[#D8D8D8]`}
      />
      <span
        className={`font-extrabold leading-none tracking-tight text-lethics-brand ${textSizes[size]} group-hover:opacity-90 transition-opacity`}
      >
        Lethics
      </span>
    </Link>
  );
}
