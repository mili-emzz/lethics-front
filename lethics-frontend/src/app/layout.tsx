import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFF5EC] text-[#1E1E1E] font-sans antialiased selection:bg-[#FFECC2] selection:text-[#1E1E1E]">
        <AppProvider>
          <Suspense fallback={<div className="h-16 bg-white border-b border-[#D8D8D8]" />}>
            <Header />
          </Suspense>
          <main className="flex-1 pb-16 lg:pb-0">
            <Suspense
              fallback={
                <div className="flex min-h-[60vh] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
          <Footer />
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                borderRadius: "1rem",
                fontFamily: "var(--font-inter), sans-serif"
              }
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
