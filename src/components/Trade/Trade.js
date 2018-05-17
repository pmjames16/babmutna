import React, { Component } from "react";
import "./Trade.css";
import CalendarModal from "../Duty/CalendarModal";


class Trade extends Component {

  static defaultProps = {

  };

  render() {
    const {
      users,
      currentUser
    } = this.props;
    const isReady = users.length > 4;
    const tradeUsers = isReady ? [ users[3] ]: [{
        name: "Arif Hadii",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait1.jpg?alt=media&token=ca4a4b01-493e-4a4a-a8ea-a750832a94cc",
        skill: "senior",
        id: 0
    }];

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
