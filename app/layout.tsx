import type { Metadata } from "next";
import local from 'next/font/local';
import "./globals.css";

const mabry = local({
  src: [
    {
      path: '../public/fonts/MabryPro-Black.ttf',
      weight: '900',
    },
    {
      path: '../public/fonts/MabryPro-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/fonts/MabryPro-Medium.ttf',
      weight: '500',
    },
    {
      path: '../public/fonts/MabryPro-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/MabryPro-Italic.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-mabry',
});


export const metadata: Metadata = {
  title: "A game client",
  description: "idk.. cicada?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mabry.className}>{children}</body>
    </html>
  );
}
