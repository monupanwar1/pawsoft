'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    name: 'Account',
    path: '/account',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
];
export default function Header() {
  const activePathName = usePathname();

  return (
    <header className="fixed border-b w-full flex items-center justify-between backdrop-blur-sm h-14  px-4">
      <Link className="font-bold focus:outline-none" href="/">
        PawSoft
      </Link>
      <nav className="h-full ">
        <ul className="flex gap-x-6 h-full  text-sm">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn(
                ' hover:font-medium transition flex items-center relative ',
                activePathName === route.path
                  ? 'text-neutral-900'
                  : 'text-primary',
              )}
            >
              <Link className="focus:outline-none" href={route.path}>
                {route.name}
              </Link>

              {activePathName === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-black h-1 w-full absolute bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
