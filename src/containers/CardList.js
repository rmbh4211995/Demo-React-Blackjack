import React, { Component } from 'react';
import Card from '../components/Card.js';
import '../style/Card.css';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let cardList;
    if (this.props.player) {
      cardList = this.props.player.cards.map(card => {
        return (
          <Card card={card} />
        );
      })
    }

    if (this.props.dealer) {
      cardList = this.props.dealer.cards.map(card => {
        return (
          <Card card={card} />
        );
      })
    }

    return (
      <div className="card-mat">
        <div className="card-container">
          {cardList}
        </div>
      </div>
    );
  }
}

export default CardList;
