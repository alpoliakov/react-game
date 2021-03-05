import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const easing = [0.175, 0.85, 0.42, 0.96];

const textVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing },
  },
};

export default function Rules() {
  return (
    <div>
      <Head>
        <title>Rules</title>
      </Head>
      <div className="relative py-16">
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          className="relative px-4 sm:px-6 lg:px-8">
          <motion.div variants={textVariants} className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-orange-600 dark:text-pink-500 font-semibold tracking-wide uppercase">
                Introducing
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Blackjack Rules
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8">
              Hit or Stand gameplay is based on Atlantic City and Las Vegas multiple deck casinos
              rules. <strong>Blackjack rules</strong> vary from casino to casino, which makes
              learning blackjack strategy more complicated.
            </p>
          </motion.div>
          <motion.div
            variants={textVariants}
            className="mt-6 prose prose-orange dark:prose-dark dark:prose-pink prose-lg mx-auto">
            <p>
              However, many correct moves are fundamental enough that they do not differ from casino
              to casino, and most large scale casinos have very similar rules - usually matching
              those <strong>in Vegas or A.C.</strong>. The strategy tables for{' '}
              <strong>Vegas and A.C.</strong> are displayed below. To find strategy tables for a
              particular casino, you can visit{' '}
              <a href="https://www.blackjackinfo.com/">
                <strong>BlackJack Info</strong>
              </a>
              , a site that can generate customized tables.
            </p>
            <span className="block text-base text-center text-gray-900 dark:text-gray-100 font-semibold tracking-wide uppercase">
              Basic Blackjack Rules:
            </span>
            <ul>
              <li>The goal of blackjack is to beat the dealer`s hand without going over 21.</li>
              <li>
                Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
              </li>
              <li>
                Each player starts with two cards, one of the dealer`s cards is hidden until the
                end.
              </li>
              <li>
                To `Hit` is to ask for another card. To `Stand` is to hold your total and end your
                turn.
              </li>
              <li>
                If you go over 21 you bust, and the dealer wins regardless of the dealer`s hand.
              </li>
              <li>If you are dealt 21 from the start (Ace & 10), you got a blackjack.</li>
              <li>
                Blackjack usually means you win 1.5 the amount of your bet. Depends on the casino.
              </li>
              <li>Dealer will hit until his/her cards total 17 or higher.</li>
              <li>
                Doubling is like a hit, only the bet is doubled and you only get one more card.
              </li>
              <li>
                Split can be done when you have two of the same card - the pair is split into two
                hands.
              </li>
              <li>
                Splitting also doubles the bet, because each new hand is worth the original bet.
              </li>
              <li>
                You can only double/split on the first move, or first move of a hand created by a
                split.
              </li>
              <li>You cannot play on two aces after they are split.</li>
              <li>
                You can double on a hand resulting from a split, tripling or quadrupling you bet.
              </li>
            </ul>
            <p>
              Once you are ready to place a bet, wait for the current hand to be completed, then
              push your bet into the betting circle. Your chips should be in one stack. If you are
              betting multiple denominations of chips, place the larger valued chips on the bottom
              of the stack, and the smaller value chips on top. Once the cards have been dealt, you
              are not allowed to touch the bet in the circle. If you need to know how much you have
              bet for doubling or splitting (explained later), the dealer will count down the chips
              for you. Once the hand is over, the dealer will move around the table to each position
              in turn, paying winning hands and collecting the chips from losing hands. After the
              dealer has paid you, you can remove your chips from the circle, and place your next
              bet. If you want to let your winnings ride, you will need to form one stack of chips
              from the two or more stacks on the table after the dealer pays you. Remember, higher
              value chips should be placed on the bottom of the stack.
            </p>
            <blockquote>
              <p>
                Blackjack, also called twenty-one and pontoon, gambling card game popular in casinos
                throughout the world. Its origin is disputed, but it is certainly related to several
                French and Italian gambling games. In Britain since World War I, the informal game
                has been called pontoon.
              </p>
            </blockquote>
            <p>
              When you are ready to leave the table, you do not cash in your chips the same way you
              bought them. The dealer cannot give you cash for the chips at the table. To do that,
              you must take the chips to the casino cashier. If you have a lot of low denomination
              chips in front of you at the table, you should trade them for the equivalent higher
              value chips instead. In between hands, just tell the dealer you want to `color up`,
              and he will have you push your chips into the middle of the table.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
