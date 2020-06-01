import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.push}>New Joke</button>
      </div>
    );
  }
}

export default Button;
