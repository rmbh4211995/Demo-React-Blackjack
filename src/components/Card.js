import React, { Component } from 'react';
import '../style/Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <div className={this.props.card.color}>
          <p>{this.props.card.number}</p>
          <p>{this.props.card.suit}</p>
        </div>
      </div>
    );
  }
}

export default Card;
