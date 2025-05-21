import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chairity Card Club",
  description: "Join the club that gets good results from bad behavior",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-r from-purple-600 to-blue-600 text-white`}>
        <Providers>
          <nav className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold text-purple-600">
                      Chairity Card Club
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      href="/campaigns"
                      className="border-transparent text-gray-500 hover:border-purple-500 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Browse Campaigns
                    </Link>
                    <Link
                      href="/campaigns/new"
                      className="border-transparent text-gray-500 hover:border-purple-500 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Start a Campaign
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Link
                    href="/login"
                    className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {children}

          <footer className="bg-white mt-12">
            <div className="max-w-6xl mx-auto py-12 px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
                  <p className="text-gray-600">
                    Chairity Card Club is a platform for creating and joining charity card clubs for causes you care about.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/campaigns" className="text-gray-600 hover:text-purple-600">
                        Browse Campaigns
                      </Link>
                    </li>
                    <li>
                      <Link href="/campaigns/new" className="text-gray-600 hover:text-purple-600">
                        Start a Campaign
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" className="text-gray-600 hover:text-purple-600">
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                  <p className="text-gray-600">
                    Email: <a href="mailto:support@chairitycardclub.com" className="text-purple-600 hover:text-purple-800">support@chairitycardclub.com</a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
