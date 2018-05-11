import React, { Component } from "react";
// import "./Calendar.css";

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <ul className="">
          <li className="">
          <a href="#">Davidee</a>
          </li>
          <li>
          <a onClick={() => this.props.changeScreen('Home')}>Home</a>
          </li>
          <li>
          <a onClick={() => this.props.changeScreen('Calendar')}>Calendar</a>
          </li>
          <li>
          <a onClick={() => this.props.changeScreen('Recipe')}>Recipe</a>
          </li>
          <li>
          <a onClick={() => this.props.changeScreen('About')}>About</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;