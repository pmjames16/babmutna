import React, { Component } from "react";
import "./Trade.css";
import CalendarModal from "./CalendarModal";


class Trade extends Component {

  static defaultProps = {

  };

  render() {
    const {
      users,
      currentUser
    } = this.props;
    const tradeUsers = [ users[3] ];

    return (
      <div className="trade-wrapper">
        <div className="trade-title">Switch My Duty Date</div>
        <div className="content-wrapper">
          <div className="fromto-wrapper">
            <span className="fromto-title">From/To</span>
            <i className="calendar-icon fas fa-calendar-alt"></i>
          </div>
          <div className="trade-users-wrapper">
            <img
              className="trade-user-image"
              src={tradeUsers[0].image}
              alt={tradeUsers[0].name}
            />
            <div className="trade-user-name">{tradeUsers[0].name}</div>
            <span className="other-trade-users">&nbsp;+ 2 others&nbsp;</span>
            <i className="trade-users-dropdown-icon fas fa-chevron-down"></i>
            <span className="send-button-wrapper">
              <button className="send-button" disabled>
                SEND
              </button>
            </span>
          </div>
        </div>
        <CalendarModal/>
      </div>
    );
  }
}

export default Trade;
