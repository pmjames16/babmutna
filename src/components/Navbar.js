import React, { Component } from "react";
import "./Navbar.css";
class Navbar extends Component {
  render() {
    return (
      <div>
        <div id="wrapper">
          <nav
            className="navbar navbar-inverse navbar-fixed-top"
            id="sidebar-wrapper"
            role="navigation"
          >
            <ul className="nav sidebar-nav">
              <li className="sidebar-brand">
                <a href="#">Davidee</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
            </ul>
          </nav>
          <div id="page-content-wrapper">
            <button
              type="button"
              className="hamburger is-closed"
              data-toggle="offcanvas"
            >
              <span className="hamb-top" />
              <span className="hamb-middle" />
              <span className="hamb-bottom" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
