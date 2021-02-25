import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="p-8 bg-gray-200 dark:bg-gray-800 flex justify-around items-center font-bold text-xl">
      <Link href="https://rs.school/js/">
        <a className="shadow__item hover__item" target="_blank">
          <Image src="/rs_school_logo.svg" alt="Logo" width={150} height={30} />
        </a>
      </Link>
      <h1 className="shadow__item">
        <span className="mt-2 block text-xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Created: 2021:{' '}
          <Link href="https://github.com/alpoliakov">
            <a className="hover__item hover:text-orange-600" target="_blank">
              @alpoliakov
            </a>
          </Link>
        </span>
      </h1>
    </div>
  );
};

export default Footer;
