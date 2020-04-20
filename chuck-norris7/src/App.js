import React, { Component } from "react";
import "./App.css";

import Header from "./Header.js";
import Button from "./Button.js";
import ChuckJokes from "./ChuckJokes.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
    };

    this.newJoke = this.newJoke.bind(this);
    this.getJokeFromArray = this.getJokeFromArray.bind(this);
  }

  //let jokeArray = this.state.jokeArray <= give a new array of what is currently inside state

  //joke = {
  //value: ""
  //jokeID: jokeArray.length
  //}
  //jokeArray.push(joke)
  //this.setState({
  //jokeArray: jokeArray
  //})
  getJokeFromArray() {
    //pull from array instead
    let index = this.getRandomInt(0, this.state.jokeArray.length - 1);
    this.setState({
      jokeID: this.state.jokeArray[index].jokeID,
      jokes: this.state.jokeArray[index].value,
    });
  }

  newJoke() {
    let URL = "http://localhost:4000/jokes"; //READ
    // "https://cors-anywhere.herokuapp.com/https://chuck-norris-jokes-api.herokuapp.com/jokes";
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        let index = this.getRandomInt(0, res.length - 1);
        console.log(res);
        this.setState({
          jokeArray: res,
          jokeID: res[index].jokeID,
          jokes: res[index].value,
        });
        console.log(index);
      });
  }

  componentDidMount() {
    this.newJoke();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="body">
          <form className="form">
            <input type="text" placeholder="Input joke ID"></input>
            <input type="submit" value="submit"></input>
            <input type="text" placeholder="Create Your Own Joke!"></input>
            <input type="submit" value="submit"></input>
          </form>
          <ChuckJokes text={this.state.jokes} jokeID={this.state.jokeID} />
          <Button push={this.getJokeFromArray} />
        </div>
      </div>
    );
  }
}

export default App;
