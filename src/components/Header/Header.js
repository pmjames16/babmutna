import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render () {
    return (
      <div className="header-wrapper">
        <div className="hamburger" onClick={this.props.toggleMenu}/>
        <div className="header">Babmutna</div>
        <img
          src="https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          alt="Davidee"
          className="user-self"
        />
      </div>
    )
  }
}

export default Header;
