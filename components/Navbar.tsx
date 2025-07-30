'use client';
import { cn } from '@/lib/utils';
import { FaDog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from '@clerk/nextjs';

const routes = [
  { name: 'Account', path: '/account' },
  { name: 'Dashboard', path: '/dashboard' },
];

export default function Header() {
  const activePathName = usePathname();
  const { user, isSignedIn } = useUser();

  return (
    <header className="fixed z-50 border-b w-full flex items-center justify-between backdrop-blur-sm h-14 px-4">
      {/* Logo */}
      <Link
        className="font-bold focus:outline-none flex items-center gap-2"
        href="/"
      >
        <FaDog className="text-blue-500 text-xl" />
        PawSoft
      </Link>

      <nav className="h-full flex items-center gap-4">
        <ul className="flex gap-x-6 h-full text-sm">
          {isSignedIn ? (
            <>
              {routes.map((route) => (
                <li
                  key={route.path}
                  className={cn(
                    'hover:text-neutral-950 font-semibold dark:hover:text-white transition flex items-center relative',
                    activePathName === route.path
                      ? 'text-neutral-950 dark:text-white'
                      : 'text-neutral-700 dark:text-neutral-400',
                  )}
                >
                  <Link className="focus:outline-none" href={route.path}>
                    {route.name}
                  </Link>

                  {activePathName === route.path && (
                    <motion.div
                      layoutId="header-active-link"
                      className="bg-black dark:bg-white h-1 w-full absolute bottom-0"
                    ></motion.div>
                  )}
                </li>
              ))}
              <div className="flex items-center justify-center">
                <Avatar className="h-10 w-10 border ">
                  <AvatarImage src={user?.imageUrl} alt="User" />
                  <AvatarFallback>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </>
          ) : (
            <div className='flex items-center justify-center'
            >
              <Link
                className="hover:text-neutral-950 font-semibold dark:hover:text-white transition flex items-center"
                href="/sign-in"
              >
                SignIn
              </Link>
            </div>
          )}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
