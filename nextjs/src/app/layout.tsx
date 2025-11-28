import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js with Tigris Storage SDK",
  description:
    "Next.js application using Tigris storage SDK to upload, list, and delete objects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                <Link href="/" className="">
                  Next.js with Tigris Storage SDK
                </Link>
              </h1>
            </div>
          </header>

          <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
