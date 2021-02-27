import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../lib/useAuth';

const Dropdown = () => {
  const { user, signOut } = useAuth();

  const srcUserLogo = user
    ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    : '/hacker.png';

  const logOut = () => {
    signOut();
  };

  return (
    <div className="mr-10 relative">
      <button
        id="user-menu"
        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white hover:transform scale-125 transition duration-150 ease-in-out"
        aria-label="User menu"
        aria-expanded="true"
        aria-haspopup="true">
        <img className="h-8 w-8 rounded-full" src={srcUserLogo} alt="logo" />
      </button>
      <div
        id="user-menu-dropdown"
        className="menu-hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
        <div
          className="py-1 rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu">
          <Link href={user ? `/user/${user._id}` : '/auth/signin'}>
            <a
              className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem">
              {user ? 'Your Profile' : 'Login'}
            </a>
          </Link>
          <Link href={user ? '/settings' : '/auth/signup'}>
            <a
              className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem">
              {user ? 'Settings' : 'Sign up'}
            </a>
          </Link>
          {user && (
            <Link href="/">
              <button
                type="button"
                className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                onClick={logOut}>
                Sign out
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
