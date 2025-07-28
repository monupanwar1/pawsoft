'use client';
import { FaDog } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-50 border-t w-full flex items-center justify-between mx-auto h-14 px-4 text-sm">
      {/* Logo */}
      <h1 className="font-bold flex items-center gap-2">
        <FaDog className="text-blue-500 text-xl" />
        PawSoft
      </h1>

      {/* Copyright */}
      <p className="text-neutral-700 dark:text-neutral-400">
        © {currentYear} PawSoft. All Rights Reserved.
      </p>
    </footer>
  );
}
