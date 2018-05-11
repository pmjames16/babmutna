import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TodayMenu from './components/TodayMenu/TodayMenu'
import Calendar from './components/Calendar/Calendar'
import Recipe from './components/Recipe/Recipe'
import About from './components/About/About'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: 'Home'
    }
  }

  changeScreen = (screen) => {
    this.setState({ body: screen })
  }

  render() {
    let body = null
    if ( this.state.body === 'Calendar' ) { body = <Calendar /> }
    else if ( this.state.body === 'Recipe' ) { body = <Recipe /> }
    else if ( this.state.body === 'About' ) { body = <About /> }
    else { body = <TodayMenu /> }

    return (
      // <div className="bg-secondary">
      <div className="App">
        <Navbar changeScreen={this.changeScreen}/>
        {body}
      </div>
      // </div>
    );
  }
}

export default App;
