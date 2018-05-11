import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TodayMenu from "./components/TodayMenu/TodayMenu";
import CalendarTemplate from "./components/Calendar/CalendarTemplate";
import Recipe from "./components/Recipe/Recipe";
import About from "./components/About/About";
import Header from "./components/Header/Header";
import Menu from "./components/Header/Menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "Calendar",
      menu: false
    };
  }

  changeScreen = screen => {
    this.setState({ body: screen, menu: false });
  };

  toggleMenu = () => {
    this.setState(prevState => {
      return { menu: !prevState.menu };
    });
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
        <Header toggleMenu={this.toggleMenu} />
        {body}
        {this.state.menu ? (
          <Menu changeScreen={this.changeScreen} toggleMenu={this.toggleMenu} />
        ) : null}
      </div>
    );
  }
}

export default App;
