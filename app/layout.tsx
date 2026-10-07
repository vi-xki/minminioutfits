import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { BagProvider } from "@/components/BagProvider";
import BagDrawer from "@/components/BagDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { site } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand.fullName} — Women's Dress Collection`,
    template: `%s · ${site.brand.fullName}`,
  },
  description: site.brand.tagline,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-sans">
        <BagProvider>
          <Marquee
            items={site.announcement}
            className="bg-plum py-2 text-paper"
            itemClassName="text-[11px] font-medium uppercase tracking-[0.25em]"
          />
          <Header />
          <main>{children}</main>
          <Footer />
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
