import { FullscreenExitOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

export default function BreadcrumbItem({ user }) {
  return (
    <nav className="text-black font-bold align-middle" aria-label="Breadcrumb">
      <ol className="list-none p-0 m-0 inline-flex text-gray-500 dark:text-gray-100">
        <li className="flex items-center">
          <Link href="/">
            <a
              className="shadow__item hover__item text-gray-500 hover:text-orange-600 focus:text-orange-600 dark:focus:text-pink-500 dark:text-gray-100"
              aria-current="page">
              Home
            </a>
          </Link>
          <svg
            className="fill-current w-3 h-3 mx-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512">
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        </li>
        <li className="flex items-center">
          <Link href="/rules">
            <a
              className="shadow__item hover__item hover:text-orange-600 text-gray-500 focus:text-orange-600 dark:focus:text-pink-500 dark:text-gray-100"
              aria-current="page">
              Rules
            </a>
          </Link>
          {user && (
            <svg
              className="fill-current w-3 h-3 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          )}
        </li>
        {user && (
          <li>
            <Link href={`/game/${user._id}`}>
              <a
                className="shadow__item hover__item hover:text-orange-600 text-gray-500 focus:text-orange-600 dark:focus:text-pink-500 dark:text-gray-100"
                aria-current="page">
                Game
              </a>
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
}
