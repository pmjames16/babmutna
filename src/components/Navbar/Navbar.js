import React, { Component } from "react";
import "./Navbar.css";
class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggled: false
    }
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return { toggled: !prevState.toggled }
    })
  }


  render() {

    // var trigger = $('.hamburger'),

    //   isClosed = false;

    //   trigger.click(function () {
    //     hamburger_cross();
    //   });

    //   function hamburger_cross() {

    //     if (isClosed == true) {
    //       overlay.hide();
    //       trigger.removeClass('is-open');
    //       trigger.addClass('is-closed');
    //       isClosed = false;
    //     } else {
    //       overlay.show();
    //       trigger.removeClass('is-closed');
    //       trigger.addClass('is-open');
    //       isClosed = true;
    //     }
    // }

    // $('[data-toggle="offcanvas"]').click(function () {
    //       $('#wrapper').toggleClass('toggled');
    // });
    return (
      <div className="nav">
        {/* <div id="wrapper" className={this.state.toggled? 'toggle' : ''}> */}
        <div id="wrapper" >
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
          </nav>
          <div id="page-content-wrapper">
            <button
              type="button"
              className={"hamburger is-closed"}
              // className={"hamburger " + (this.state.toggled? 'is-open' : 'is-closed')}
              data-toggle="offcanvas"
              // onClick={() => this.toggleMenu()}
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
