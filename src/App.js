import React, { Component } from 'react';
import Player from './components/Player.js';
import logo from './logo.svg';
import './style/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: [],
      cleanDeck: [],
      player: null,
      dealer: null,
      message: null
    };
  }

  createDeck() {
    const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const suits = ['♦','♣','♥','♠'];
    let deck = [];
    let val = 0;

    cards.forEach(card => {
      // ace can be 1 or 11 - FIX
      if (card === 'A') {
        val = 11;
      } else if (card === 'J' || card === 'Q' || card === 'K') {
        val = 10;
      } else {
        val = card;
      }

      suits.forEach(suit => {
        let obj = {
          number: card,
          value: val,
          suit: suit,
          color: (suit === '♦' || suit === '♥') ? 'card-text-red' : 'card-text-black'
        }

        deck.push(obj);
        this.setState({
          deck: deck,
          cleanDeck: deck
        });
      });
    });
  }

  dealCards(deck) {
    let pCard1 = this.getRandomCard(deck);
    let pCard2 = this.getRandomCard(deck);
    let dCard1 = this.getRandomCard(deck);
    let dCard2 = this.getRandomCard(deck);

    let player = {
      cards: [pCard1, pCard2],
      count: pCard1.value + pCard2.value
    }
    let dealer = {
      cards: [dCard1, dCard2],
      count: dCard1.value + dCard2.value
    }

    this.setState({player, dealer});
  }

  getRandomCard(deck) {
    // get element from array at random index, update deck
    let cardIndex = Math.floor(Math.random() * deck.length);
    let card = deck[cardIndex];
    //console.log(cardIndex);
    //console.log(card);
    deck.splice(cardIndex, 1);

    this.setState({
      deck: deck
    });

    return card;
  }

  hit(player, dealer, deck, mode) {
    let gameMode;
    let cardIndex = Math.floor(Math.random() * deck.length);
    let card = deck[cardIndex];
    deck.splice(cardIndex, 1);

    if (mode === 'player') {
      player.cards.push(card);
      player.count += card.value;
      this.setState({
        deck: deck,
        player: player
      });
      gameMode = 'hit';
    } else if (mode === 'dealer') {
      dealer.cards.push(card);
      dealer.count += card.value;
      this.setState({
        deck: deck,
        dealer: dealer
      });
      gameMode = 'stay'
    }

    this.determineWinner(player, dealer, deck, gameMode);
  }

  determineWinner(player, dealer, deck, mode) {
    let message;

    if (mode === 'stay') {
      if (player.count > dealer.count) {
        message = `Your count is ${player.count}. You win!`;
      } else if (dealer.count > player.count) {
        message = `Dealer count is ${dealer.count}. You lose!`;
      } else {
        message = `Same count. You tie!`;
      }
    } else if (mode === 'hit') {
      if (player.count >= 21) {
        message = `Your count is ${player.count}. You bust!`;
      } else if (dealer.count >= 21) {
        message = `Dealer count is ${dealer.count}. You win!`;
      } else {
        message = `Your count is ${player.count}.`;
      }
    }

    this.setState({
      message: message
    });

    alert(message);
  }

  stay(player, dealer, deck) {
    if (dealer.count < 17) {
      this.hit(player, dealer, deck, 'dealer');
    } else {
      this.determineWinner(player, dealer, deck, 'stay');
    }
  }

  resetGame() {
    this.createDeck();
    this.dealCards(this.state.deck);
  }

  componentWillMount() {
    this.createDeck(this.state.deck);
  }

  componentDidMount() {
    this.dealCards(this.state.deck);
  }

  render() {
    console.log(this.state.deck);
    console.log(this.state.player);
    console.log(this.state.dealer);

    return (
      <div className="App">
        <p>Welcome to Blackjack with React.js</p>
        <p><img src={logo} className="App-logo" alt="logo" /></p>
        <button onClick={() => this.hit(this.state.player, this.state.dealer, this.state.deck, 'player')}>Take a hit</button>
        <button onClick={() => this.stay(this.state.player, this.state.dealer, this.state.deck)}>Stay</button>
        <button onClick={() => this.resetGame()}>Start New Game</button>
        <Player deck={this.state.deck} player={this.state.player} dealer={this.state.dealer} />
      </div>
    );
  }
}

export default App;

// {this.hit.bind(this)}
