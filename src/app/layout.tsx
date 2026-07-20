import type { Metadata } from "next";
import { Manrope, Roboto_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ЧПУ-фрезеровка дерева и пластика в Ярославле",
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "ЧПУ-фрезеровка фанеры, МДФ, массива дерева и пластика в Ярославле и области. Детали на заказ по чертежу, эскизу или фотографии.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: siteConfig.name,
    title: "ЧПУ-фрезеровка дерева и пластика в Ярославле",
    description: "Детали и изделия из фанеры, МДФ, массива дерева и пластика по чертежу, эскизу или фотографии.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ЧПУ-фрезеровка дерева и пластика в Ярославле",
    description: "Изготовление деталей и изделий на ЧПУ для частных заказчиков в Ярославле и области.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
