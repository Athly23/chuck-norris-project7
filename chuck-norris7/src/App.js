import React, { Component } from "react";
import "./App.css";

import Header from "./Header.js";
import Button from "./Button.js";
import ChuckJokes from "./ChuckJokes.js";
//import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
      newJokeText: "",
      chuckID: "",
    };

    this.newJoke = this.newJoke.bind(this);
    this.getJokeFromArray = this.getJokeFromArray.bind(this);
    this.createJoke = this.createJoke.bind(this);
    this.updateNewJoke = this.updateNewJoke.bind(this);
    this.sendNewJokeToDataBase = this.sendNewJokeToDataBase.bind(this);
    this.logState = this.logState.bind(this);
    this.findJokeID = this.findJokeID.bind(this);
    this.receiveJokeFromID = this.receiveJokeFromID.bind(this);
    this.deleteJokeFromID = this.deleteJokeFromID.bind(this);
  }

  findJokeID(e) {
    this.setState({
      chuckID: e.target.value,
    });
    console.log(this.state.chuckID);
  }

  deleteJokeFromID(e) {
    e.preventDefault();
    console.log("delete run");
    let URL = `http://localhost:4000/jokes/${this.state.chuckID}`;
    fetch(URL, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          chuckID: res,
        });
      });
  }

  receiveJokeFromID(evt) {
    evt.preventDefault();
    let URL = `http://localhost:4000/jokes/${this.state.chuckID}`;
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        if (res[0]) {
          this.setState({
            jokeID: res[0].jokeID,
            jokes: res[0].value,
          });
        } else {
          alert("Joke does not exist!");
        }

        // console.log(res[0].value);
      });
  }

  logState() {
    console.log(this.state); //calling logState after setState is completed
  }

  sendNewJokeToDataBase(e) {
    e.preventDefault();
    console.log(this.state.newJokeText);
    let joke = {
      value: this.state.newJokeText,
      jokeID: this.state.jokeArray.length,
    };
    let URL = "http://localhost:4000/jokes";
    console.log(JSON.stringify(joke));
    fetch(URL, {
      method: "post",
      body: JSON.stringify(joke), //converts joke object to JSON, then send that JSON to post requset
      headers: { "Content-type": "application/json" },
    })
      .then(res => res.json())
      .then(res => {
        // this.setState({
        //   newJokeText: "",
        // });
        fetch(URL, {
          method: "get",
        })
          .then(res => res.json())
          .then(res => {
            this.setState(
              {
                jokeArray: res, //updating state array to a new joke array
                jokes: joke.value,
                jokeID: joke.jokeID,
              },
              this.logState
            );
          });
        // console.log(res);
      });
  }

  updateNewJoke(e) {
    this.setState({
      newJokeText: e.target.value, //set newJokeText state to whatever to text field.
    });
  }

  createJoke() {
    let jokeArray = this.state.jokeArray;
    // <= give a new array of what is currently inside state

    let joke = {
      value: "",
      jokeID: jokeArray.length,
    };
    jokeArray.push(joke);
    this.setState({
      jokeArray: jokeArray,
    });
  }
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
            <input
              type="text"
              placeholder="Input joke ID"
              onChange={this.findJokeID}
            ></input>
            <input
              onClick={this.receiveJokeFromID}
              type="submit"
              value="submit"
            ></input>
          </form>
          <form>
            <input
              type="text"
              placeholder="Input joke ID to DELETE"
              onChange={this.findJokeID}
            ></input>
            <input
              onClick={this.deleteJokeFromID}
              type="submit"
              value="submit"
            ></input>
          </form>
          <form className="form">
            <input
              type="text"
              placeholder="Create Your Own Joke!"
              value={this.state.newJokeText}
              onChange={this.updateNewJoke}
            ></input>
            <input
              onClick={this.sendNewJokeToDataBase}
              type="submit"
              value="submit"
            ></input>
          </form>
          <ChuckJokes text={this.state.jokes} jokeID={this.state.jokeID} />
          <Button push={this.getJokeFromArray} />
        </div>
      </div>
    );
  }
}

export default App;
