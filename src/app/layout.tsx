import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnugBug Dashboard",
  description: "SnugBug manufacturer and waitlist tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-sm">
        <nav className="border-b border-gray-200 px-4 py-2 flex items-center gap-4 text-xs">
          <span className="font-bold text-base">SnugBug</span>
          <Link href="/" className="text-gray-500 hover:text-black">Manufacturers</Link>
          <Link href="/waitlist" className="text-gray-500 hover:text-black">Waitlist</Link>
        </nav>
        <main className="flex-1 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
