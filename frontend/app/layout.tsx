import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from "./components/header";

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
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}