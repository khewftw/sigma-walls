import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import "./globals.css";
import "./sections.css";
const manrope = localFont({ src: [{ path: "./fonts/manrope-regular.ttf", weight: "400" }, { path: "./fonts/manrope-semibold.ttf", weight: "600" }], variable: "--font-manrope", display: "swap" });
export const metadata: Metadata = {
  title: "Sigma — натяжные стены с текстильной фактурой",
  description: "Ровные стены с текстильной фактурой — без долгого ремонта. Натяжные стены Sigma: декоративная ткань на каркасе, выбор цветов и фактур.",
  icons: { icon: "/images/Vector.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru" className={manrope.variable}><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
