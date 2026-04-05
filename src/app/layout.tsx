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
  description: "Leadership dashboard for SnugBug — manufacturers, waitlist, and outreach tracking",
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
      <body className="min-h-full flex flex-col">
        <nav className="border-b border-card-border bg-card-bg px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-snugbug-red">
              SnugBug
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/" className="text-snugbug-gray hover:text-foreground transition-colors">
                Manufacturers
              </Link>
              <Link href="/waitlist" className="text-snugbug-gray hover:text-foreground transition-colors">
                Waitlist
              </Link>
            </div>
          </div>
          <span className="text-xs text-snugbug-gray">Leadership Dashboard</span>
        </nav>
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
