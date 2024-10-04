import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isRegisterPage = router.pathname === '/register';

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="GymXYZ Logo" width={150} height={60} />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                {!isRegisterPage && (
                  <>
                    <Link href="/classes" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Classes</Link>
                    <Link href="/trainers" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Trainers</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {!isRegisterPage && (
                <Button variant="default" className="ml-4" onClick={() => router.push('/login')}>Login</Button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            {!isRegisterPage && (
              <>
                <Link href="/classes" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Classes</Link>
                <Link href="/trainers" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Trainers</Link>
              </>
            )}
          </div>
          {!isRegisterPage && (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="default" className="ml-auto" onClick={() => router.push('/login')}>Login</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}