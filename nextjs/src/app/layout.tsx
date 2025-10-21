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
                Next.js with Tigris Storage SDK
              </h1>

              <nav className="">
                <Link
                  className="mr-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-md font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"
                  href="/"
                >
                  Objects
                </Link>
                <Link
                  className="mr-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-md font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"
                  href="/buckets"
                >
                  Buckets
                </Link>
              </nav>
            </div>
          </header>

          <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
