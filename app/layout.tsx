import type { Metadata } from "next";
import { Noto_Sans_Tai_Le } from "next/font/google";
import "./globals.css";

import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import Header from "@/app/_components/Header";

const noto = Noto_Sans_Tai_Le({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    template: "KickZone | %s",
    default: "KickZone | Sneakers",
  },
  description:
    "Discover the latest sneakers at KickZone, your go-to online store for top brands like Nike, Adidas, Puma, and more. Shop a wide range of men's and women's sneakers, including limited editions and the hottest streetwear trends. Enjoy a seamless shopping experience with free shipping and easy returns. Stay ahead in style with KickZone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="en">
      <body
        className={`relative bg-background text-text min-h-screen flex flex-col ${noto.className}`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
