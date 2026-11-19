import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Lethics | Plataforma Educativa de Ética y Legislación en Software",
  description:
    "Aprende sobre deontología, privacidad, sesgos algorítmicos, ciberseguridad y propiedad intelectual con simuladores interactivos y casos éticos reales."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF5EC] text-[#1E1E1E] font-display antialiased selection:bg-[#FFECC2] selection:text-[#1E1E1E]">
        <AppProvider>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-[#FFF5EC]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
              </div>
            }
          >
            {children}
          </Suspense>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                borderRadius: "1.5rem",
                fontFamily: "var(--font-inter), sans-serif"
              }
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
