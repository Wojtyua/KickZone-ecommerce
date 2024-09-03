import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import Header from "@/app/_components/header/Header";

const font = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "KickZone | %s",
    default: "KickZone | Sneakers",
  },
  description:
    "Discover the latest sneakers at KickZone, your go-to online store for top brands like Nike, Adidas, Puma, and more. Shop a wide range of men's and women's sneakers, including limited editions and the hottest streetwear trends. Enjoy a seamless shopping experience with free shipping and easy returns. Stay ahead in style with KickZone.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`relative bg-background text-text-100 min-h-screen flex flex-col  ${font.className}`}
      >
        <SessionProvider session={session}>
          <div className="max-w-screen-2xl mx-auto w-full p-2">
            <Header />
            <div className="flex-1 pt-16 grid">
              <main>{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
