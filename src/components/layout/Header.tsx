import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/login" className="transition-colors hover:text-primary">
            Officer Console
          </Link>
        </nav>
        <div className="flex items-center justify-end">
          <Button asChild>
            <Link href="/login">Voter Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
