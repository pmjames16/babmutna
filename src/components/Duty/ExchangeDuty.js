import React, { Component } from "react";
import "./ExchangeDuty.css";
import CalendarModal from './CalendarModal';
import RequestDate from './RequestDate';

class ExchangeDuty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: 0,
      requestDates: [],
      sendOn: 0
    }
  };

  addExchange = () => {
    this.setState({modalOn: 1})
  };

  dateToString (date) {
    const year = date.getYear() + 1900;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    var monthS = month.toString();
    var dayS = day.toString();
    if (month < 10) {
      monthS = "0" + monthS;
    }
    if (day < 10) {
      dayS = "0" + dayS;
    }
    return year.toString() + "-" + monthS + "-" + dayS;
  }

  selectDate = date => {
    var {
      requestDates
    } = this.state
    this.setState({modalOn: 0})
    requestDates.push(this.dateToString(date));
    this.setState({requestDates: requestDates})
  };

  selectedDates () {
    const {
      requestDates
    } = this.state;
    const {
      dutySchedule
    } = this.props
    var view = [];
    for (let i = 0 ; i < requestDates.length; i++) {
      view.push(
        <RequestDate
          date={requestDates[i]}
          dutySchedule={dutySchedule}
        />
      )
    }
    return view;
  }

  addButton() {
    const {
      requestDates
    } = this.state;
    if (requestDates.length < 3) {
      return (
        <div className="add-button" onClick={this.addExchange}>
        <i className="add-icon fas fa-plus" ></i>
        Exchange Request
      </div>
      );
    }
    else {
      return (<div></div>);
    }
  }

  sendButton() {
    const {
      requestDates
    } = this.state;
    const {
      sendExchangeRequest
    } = this.props;
    if (requestDates.length > 0) {
      return (
        <div className="send-button" onClick={() => sendExchangeRequest()}>
        Send
      </div>
      );
    }
    else {
      return (
        <div className="send-button-disabled">
          Send
        </div>
      );
    }
  };

  render() {
    const {
      exchangeDate,
      sendExchangeRequest
    } = this.props;
    const {
      modalOn,
      requestDates
    } = this.state;
    return (
      <div>
        <div className="header-spacer">
        </div>
        <div className="exchange-wrapper">
          <div className="from-wrapper">
            <span className="myduty-text">My Duty</span>
            <span className="myduty-date">{exchangeDate}</span>
          </div>
          <div className="selected-dates-wrapper">
            {this.selectedDates()}
          </div>
          {this.addButton()}
        </div>
        {this.sendButton()}
        <CalendarModal
          disabledDates = {[exchangeDate].concat(requestDates.map(date=>new Date(date)))}
          visible = {modalOn}
          selectDate = {this.selectDate}
        />
      </div>

    );
  }
}

export default ExchangeDuty;