import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#D8D8D8]/50 bg-white/60 py-8 text-center text-xs text-[#6C6C63]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Lethics. Plataforma Educativa de Ética y Legislación en Software.</p>
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/manual" className="hover:text-[#3E4B8F] transition-colors">
            Manual de Usuario
          </Link>
          <span className="text-[#D8D8D8]">·</span>
          <span>Códigos ACM / IEEE</span>
          <span className="text-[#D8D8D8]">·</span>
          <span>Privacy by Design</span>
        </div>
      </div>
    </footer>
  );
}
