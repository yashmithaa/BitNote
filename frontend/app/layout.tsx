import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from "./components/header";
import DotBackgroundDemo from "./components/ui/DotBackgroundDemo";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'P2P Notes Sharing',
  description: 'Share and download academic notes in a peer-to-peer network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <div className="relative min-h-screen w-full">
          {/* Background */}
          <div className="fixed inset-0 -z-10">
            <DotBackgroundDemo />
          </div>
          {/* Main content */}
          <main className="relative min-h-screen text-white">{children}</main>
        </div>
      </body>
    </html>
  );
}