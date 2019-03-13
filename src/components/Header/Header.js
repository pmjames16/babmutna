import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    const { title, currentUser, toggleLogin, toggleAlarm } = this.props;
    const isLogined = currentUser.id !== -1;
    let logintab = isLogined ? (
      <div style={{ width: 50, marginRight: 15, paddingLeft: 15 }}>
        <img
          onClick={toggleAlarm}
          src={currentUser.image}
          alt={currentUser.name}
          className="user-self"
        />
      </div>
    ) : (
      <div onClick={toggleLogin} style={styles.login}>
        Login
      </div>
    );
    let headertitle;
    if (title === "HOME") headertitle = "Babmutna";
    else if (title === "RecipeTemplate") headertitle = "Recipe";
    else headertitle = title;
    return (
      <div className="header-wrapper">
        <div className="frame" />
        {title === "Home" ? (
          <div className="hamburger" onClick={this.props.toggleMenu}>
            <div className="hamburger-top" />
            <div className="hamburger-mid" />
            <div className="hamburger-bot" />
          </div>
        ) : (
          <div className="homeicon" onClick={this.props.handleHome}>
            <i class="fas fa-home" />
          </div>
        )}
        <div className="header">{headertitle}</div>
        {logintab}
      </div>
    );
  }
}
const styles = {
  login: {
    marginRight: 15,
    cursor: "pointer",
    width: 50,
    height: 32,
    textAlign: "center",
    paddingTop: 6,
    fontWeight: 600
  }
};
export default Header;
