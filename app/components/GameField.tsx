import { Button, Form, InputNumber, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSound from 'use-sound';

import { initializeApollo } from '../lib/apollo';
import { useEditSettingMutation } from '../lib/graphql/editSetting.graphql';
import { Setting, useSettingQuery } from '../lib/graphql/setting.graphql';
import { SettingDocument } from '../lib/graphql/setting.graphql';
import { useAuth } from '../lib/useAuth';
import Card from './Card';

export default function GameField({ id }) {
  const [editSetting] = useEditSettingMutation();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [playError] = useSound('../static/sounds/error.mp3');

  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisibleModal(true);
  };

  const [state, setState] = useState({
    _id: '',
    sound: null,
    money: null,
    rate: null,
    deck: null,
    dealer: null,
    player: null,
    complexity: null,
    currentBet: null,
    gameOver: null,
    message: '',
  });

  const {
    _id,
    sound,
    money,
    rate,
    complexity,
    currentBet,
    gameOver,
    message,
    deck,
    dealer,
    player,
  } = state;

  const generateDeck = () => {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    const suits = ['♦', '♣', '♥', '♠'];
    const deck = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({ number: cards[i], suit: suits[j] });
      }
    }
    return deck;
  };

  const getCount = (cards) => {
    const rearranged = [];
    cards.forEach((card) => {
      if (card.number === 'A') {
        rearranged.push(card);
      } else if (card.number) {
        rearranged.unshift(card);
      }
    });

    return rearranged.reduce((total, card) => {
      if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
        return total + 10;
      } else if (card.number === 'A') {
        return total + 11 <= 21 ? total + 11 : total + 1;
      } else {
        return total + card.number;
      }
    }, 0);
  };

  const getRandomCard = (deck) => {
    const updatedDeck = deck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];
    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  };

  const dealCards = (deck) => {
    const playerCard1 = getRandomCard(deck);
    const dealerCard1 = getRandomCard(playerCard1.updatedDeck);
    const playerCard2 = getRandomCard(dealerCard1.updatedDeck);
    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
    const dealerStartingHand = [dealerCard1.randomCard, {}];

    const player = {
      cards: playerStartingHand,
      count: getCount(playerStartingHand),
    };
    const dealer = {
      cards: dealerStartingHand,
      count: getCount(dealerStartingHand),
    };

    return { updatedDeck: playerCard2.updatedDeck, player, dealer };
  };

  const dealerDraw = (dealer, deck) => {
    const { randomCard, updatedDeck } = getRandomCard(deck);
    dealer.cards.push(randomCard);
    dealer.count = getCount(dealer.cards);
    return { dealer, updatedDeck };
  };

  const fetchSetting = async () => {
    const deck = generateDeck();
    const { updatedDeck, player, dealer } = dealCards(deck);

    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: SettingDocument,
      variables: { settingId: id },
    });
    setState({
      ...data.setting,
      currentBet: false,
      gameOver: false,
      message: '',
      deck: updatedDeck,
      dealer,
      player,
    });
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      rate: rate,
    });
  }, [rate]);

  const onSubmit = async () => {
    try {
      const { data } = await editSetting({
        variables: { input: { id: _id, sound, money, rate, complexity } },
      });
      if (data.editSetting._id) {
        console.log('Success');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setBet = () => {
    const newMoney = money - rate;

    if (+money <= 0) {
      setState({ ...state, message: 'Game over! Please start a new game.' });
      return showModal();
    } else if (money < rate) {
      return toast.error('Insufficient funds to bet that amount!');
    } else if (rate % 1 !== 0) {
      return toast.error('Please bet whole numbers only.');
    }

    setState({ ...state, money: newMoney, currentBet: true });
  };

  const hit = () => {
    if (!gameOver) {
      if (currentBet) {
        const { randomCard, updatedDeck } = getRandomCard(deck);
        player.cards.push(randomCard);
        player.count = getCount(player.cards);

        if (player.count > 21) {
          setState({ ...state, player, gameOver: true, currentBet: false, message: 'BUST!' });
          playError();
        } else {
          setState({ ...state, deck: updatedDeck, player });
        }
      } else {
        setState({ ...state, message: 'Please place bet.' });
      }
    } else {
      setState({ ...state, message: 'Game over! Please start a new game.' });
    }
  };

  const getWinner = (dealer, player) => {
    if (dealer.count > player.count) {
      return 'dealer';
    } else if (dealer.count < player.count) {
      return 'player';
    } else {
      return 'push';
    }
  };

  const stand = () => {
    if (!gameOver) {
      const randomCard = getRandomCard(state.deck);
      let deck = randomCard.updatedDeck;
      let dealer = state.dealer;
      dealer.cards.pop();
      dealer.cards.push(randomCard.randomCard);
      dealer.count = getCount(dealer.cards);

      while (dealer.count < 17) {
        const draw = dealerDraw(dealer, deck);
        dealer = draw.dealer;
        deck = draw.updatedDeck;
      }

      if (dealer.count > 21) {
        setState({
          ...state,
          deck,
          dealer,
          money: state.money + state.rate * 2,
          gameOver: true,
          currentBet: false,
          message: 'Dealer bust! You win!',
        });
      } else {
        const winner = getWinner(dealer, player);
        let wallet = state.money;
        let message;

        if (winner === 'dealer') {
          message = 'Dealer wins...';
        } else if (winner === 'player') {
          wallet += state.rate * 2;
          message = 'You win!';
        } else {
          wallet += state.rate;
          message = 'Push.';
        }

        setState({
          ...state,
          deck,
          dealer,
          money: wallet,
          gameOver: true,
          currentBet: false,
          message,
        });
      }
    } else {
      setState({ ...state, message: 'Game over! Please start a new game.' });
      showModal();
    }
  };

  const continueGame = () => {
    if (money > 0) {
      const deck = state.deck.length < 10 ? generateDeck() : state.deck;
      const { updatedDeck, player, dealer } = dealCards(deck);

      setState({
        ...state,
        deck: updatedDeck,
        dealer,
        player,
        currentBet: null,
        gameOver: false,
        message: null,
      });
    } else {
      setState({ ...state, message: 'Game over! You are broke! Please start a new game.' });
      showModal();
    }
  };

  useEffect(() => {
    onSubmit();
  }, [money]);

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleOk = () => {
    const deck = generateDeck();
    const { updatedDeck, player, dealer } = dealCards(deck);

    setState({
      ...state,
      money: 2000,
      deck: updatedDeck,
      dealer,
      player,
      currentBet: null,
      gameOver: false,
      message: null,
    });

    setVisibleModal(false);
    setTimeout(() => {
      toast.success('New game run!');
    }, 1500);
  };

  const ModalItem = () => {
    return (
      <Modal
        visible={visibleModal}
        title={`Wallet: ${money}`}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            New game
          </Button>,
        ]}>
        <p>{message}</p>
      </Modal>
    );
  };

  return (
    <div style={{ width: '100%', minHeight: '83vh' }} className="relative py-5">
      <ModalItem />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-screen-xl mx-auto container">
          <div className="title">
            <span className="mt-2 mb-4 block text-2xl md:text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {`Wallet: $ ${money}`}
            </span>
            <span className="mt-2 mb-4 block text-xl md:text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {message}
            </span>
            {currentBet && (
              <h2 className="text-center text-2xl text-orange-600 dark:text-pink-500">{`Your Bet: $ ${rate}`}</h2>
            )}
            {!currentBet && (
              <Form
                initialValues={{ remember: true }}
                layout="horizontal"
                form={form}
                name="rate"
                onFinish={setBet}
                className="flex align-center justify-center">
                <Form.Item
                  name="rate"
                  className="flex flex-none"
                  rules={[{ required: true, type: 'number', min: 10, max: 5000 }]}>
                  <InputNumber
                    name="rate"
                    onChange={(data) => setState({ ...state, rate: data })}
                  />
                </Form.Item>
                <Form.Item>
                  <Button disabled={gameOver} type="primary" htmlType="submit" className="ml-3">
                    Place Bet
                  </Button>
                </Form.Item>
              </Form>
            )}
            <div
              style={{ width: '470px' }}
              className="mx-auto grid grid-flow-col grid-cols-3 gap-3">
              <Button
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                type="primary"
                onClick={continueGame}
                disabled={!gameOver}
                ghost>
                Continue
              </Button>
              <Button
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                type="primary"
                ghost
                onClick={hit}
                disabled={!currentBet}>
                Hit
              </Button>
              <Button
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                type="primary"
                ghost
                onClick={stand}
                disabled={!currentBet}>
                Stand
              </Button>
            </div>
          </div>
          <div className="user text-center">
            {player && (
              <>
                <p>Your Hand ({player.count})</p>
                <table className="cards">
                  <tbody>
                    <tr>
                      {player.cards.map((card, i) => {
                        return <Card key={i} number={card.number} suit={card.suit} />;
                      })}
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="dealer text-center">
            {dealer && (
              <>
                <p>Dealer`s Hand ({dealer.count})</p>
                <table className="cards">
                  <tbody>
                    <tr>
                      {dealer.cards.map((card, i) => {
                        return <Card key={i} number={card.number} suit={card.suit} />;
                      })}
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

GameField.getInitialProps = ({ query: { id } }) => {
  return { id };
};
