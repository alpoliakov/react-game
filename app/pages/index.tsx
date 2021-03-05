import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';

import HoverLink from '../components/HoverLink';
import { useAuth } from '../lib/useAuth';

const easing = [0.175, 0.85, 0.42, 0.96];

const textVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing },
  },
};

const backVariants = {
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: easing,
    },
  },
};

const Login = (
  <p className="shadow__item text-2xl hover__item text-gray-500 hover:text-orange-600 dark:hover:text-pink-500 dark:text-gray-100">
    Login!
  </p>
);

const SignUp = (
  <p className="shadow__item text-2xl hover__item text-gray-500 hover:text-orange-600 dark:hover:text-pink-500 dark:text-gray-100">
    Sign Up!
  </p>
);

const Settings = (
  <p className="shadow__item text-2xl hover__item text-gray-500 hover:text-orange-600 dark:hover:text-pink-500 dark:text-gray-100">
    Settings!
  </p>
);

const Game = (
  <p className="shadow__item text-2xl hover__item text-gray-500 hover:text-orange-600 dark:hover:text-pink-500 dark:text-gray-100">
    Game!
  </p>
);

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '83vh' }} className="relative py-5 flex justify-center items-center">
      <Head>
        <title>Home Page</title>
      </Head>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
        className="relative px-4 sm:px-6 lg:px-8">
        <motion.div variants={textVariants} className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-orange-600 dark:text-pink-500 font-semibold tracking-wide uppercase">
              {user ? 'Greeting' : 'Introducing'}
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {user ? `Hello, ${user.username}` : `blackjack, start page`}
            </span>
          </h1>
          {!user && (
            <p className="mt-6 leading-8 prose prose-orange dark:prose-dark dark:prose-pink prose-lg mx-auto">
              <strong>Blackjack</strong> is one of the most played casino games of all times and
              it’s it’s also known as twenty one due to the fact that this particular number plays a
              role for the game’s objective. So far,{' '}
              <strong>the game’s origin remains unknown</strong> and the first written evidence of
              it was found in the 17th century.
            </p>
          )}
          {user && (
            <p className="mt-6 leading-8 prose prose-orange dark:prose-dark dark:prose-pink prose-lg mx-auto">
              You can independently customize the <strong>Blackjack</strong> game by clicking on the
              link to the settings page. You can set in the settings the amount of credit, the size
              of the bet, enable or disable sound effects, switch the difficulty of the game. In the
              upper right corner, you can switch the game theme to <strong>dark</strong> or{' '}
              <strong>light</strong>. Wish you a good time!
            </p>
          )}
        </motion.div>
        <motion.div
          variants={textVariants}
          className="mt-1 prose prose-orange dark:prose-dark dark:prose-pink prose-lg mx-auto">
          {!user && (
            <p className="text-gray-500 dark:text-gray-100 m-0">
              <strong className="mb-0">In order to start the game, you need to either:</strong>
            </p>
          )}
          {user && (
            <p className="text-gray-500 dark:text-gray-100 m-0">
              <strong className="mb-0">
                To go to the game settings or go (return) to the game, you can follow the links:
              </strong>
            </p>
          )}
          <motion.div
            variants={backVariants}
            style={{ width: 470 }}
            className="flex mt-0 mx-auto justify-around">
            {!user && (
              <>
                <HoverLink text={Login} path={'/auth/signin'} />
                <HoverLink text={SignUp} path={'/auth/signup'} />
              </>
            )}
            {user && (
              <>
                <HoverLink text={Settings} path={'/settings'} />
                <HoverLink text={Game} path={`/game/${user._id}`} />
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
