import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TodayMenu from "./components/TodayMenu/TodayMenu";
import CalendarTemplate from "./components/Calendar/CalendarTemplate";
import Recipe from "./components/Recipe/Recipe";
import About from "./components/About/About";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "Today's Menu"
    };
  }

  changeScreen = screen => {
    this.setState({ body: screen });
  };

  render() {
    let body = null;
    if (this.state.body === "Calendar") {
      body = <CalendarTemplate />;
    } else if (this.state.body === "Recipe") {
      body = <Recipe />;
    } else if (this.state.body === "About") {
      body = <About />;
    } else {
      body = <TodayMenu />;
    }

    return (
      <div className="App">
        {/* <Navbar changeScreen={this.changeScreen}/> */}
        <Header />
        {body}
      </div>
    );
  }
}

export default App;
