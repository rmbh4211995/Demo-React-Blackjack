import React, { Component } from 'react';
import CardList from '../containers/CardList.js';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <CardList player={this.props.player} />
        <CardList dealer={this.props.dealer} />
      </div>
    );
  }
}

export default Player;
