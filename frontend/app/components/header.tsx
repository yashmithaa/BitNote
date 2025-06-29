import Link from 'next/link';
import { FileText, Upload, Home } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 text-white py-2 px-5 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <FileText className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              BitNote
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="flex items-center space-x-1 transition-colors hover:text-foreground/80"
              href="/"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              className="flex items-center space-x-1 transition-colors hover:text-foreground/80"
              href="/upload"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex md:hidden">
              <Link className="flex items-center space-x-2" href="/">
                <FileText className="h-6 w-6" />
                <span className="font-bold">P2P Notes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}