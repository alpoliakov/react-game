import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '../lib/useAuth';
import BreadcrumbItem from './Breadcrumd';
import Dropdown from './Dropdown';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { message, error, user, signOut } = useAuth();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (message) {
      toast.success(message, { duration: 6000 });

      // const { body } = document;
      // body.addEventListener('keydown', hotKeys);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 6000 });
    }
  }, [error]);

  if (!mounted) return null;

  return (
    <div className="sticky top-0 z-10 p-2 pr-5 pl-5 bg-gray-200 dark:bg-gray-800 items-center font-bold text-xl grid md:grid-cols-3 sm:grid-cols-1 justify-items-center md:justify-items-stretch gap-y-5 md:gap-0">
      <BreadcrumbItem user={user} />
      <h1 className="shadow__item md:order-2 order-first">
        <span className="mt-2 block text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl uppercase">
          Blackjack
        </span>
      </h1>
      <div className="flex justify-end order-3">
        {user && (
          <span className="pt-1 mr-5 animate-pulse shadow__item text-orange-600 dark:text-pink-500">
            {user.username}
          </span>
        )}
        <Dropdown />
        <button onClick={() => setTheme('light')} className="hover:text-orange-600">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        <button onClick={() => setTheme('dark')} className="ml-4 hover:text-orange-600">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            id="moon"
            className="w-8 h-8 text-cool-gray-800 dark:text-cool-gray-200 group-hover:text-purple-600 group-focus:text-purple-600 dark:group-hover:text-purple-50 dark:group-focus:text-purple-50">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThemeChanger;
