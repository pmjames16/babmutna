import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <i className="fas fa-times menu-cancel-button" onClick={this.props.toggleMenu}></i>
        <ul className="menu-list">
          <li className="menu-user-name">
            <a className="menu-link" href="#">Davidee</a>
          </li>
          <li>
            <a className="menu-link" onClick={() => this.props.changeScreen('Home')}>Home</a>
          </li>
          <li>
            <a className="menu-link" onClick={() => this.props.changeScreen('Calendar')}>Calendar</a>
          </li>
          <li>
            <a className="menu-link" onClick={() => this.props.changeScreen('RecipeTemplate')}>Recipe</a>
          </li>
          <li>
            <a className="menu-link" onClick={() => this.props.changeScreen('About')}>About</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;