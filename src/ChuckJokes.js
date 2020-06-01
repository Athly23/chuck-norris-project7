import React, { Component } from "react";

class ChuckJokes extends Component {
  render() {
    return (
      <div className="Chuck-jokes">
        <p>{this.props.text}</p>
        <p>{this.props.jokeID}</p>
      </div>
    );
  }
}

export default ChuckJokes;
