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
      sendOn: 0,
      selectedRequests: [],
    }
  };

  addExchange = () => {
    this.setState({modalOn: 1})
  };

  selectDate = date => {
    let option = {};
    option['modalOn'] = 0;
    const dutySchedule = this.props.dutySchedule;
    const schedule = dutySchedule.filter(duty => {
      return duty.date.getDate() === date.getDate();
    })[0];
    const senior = schedule.senior;
    const junior1 = schedule.junior1;
    const junior2 = schedule.junior2;
    this.setState(({requestDates})=>{
        requestDates.push({date: date, senior: {user: senior, selected: 0}, junior1: {user: junior1, selected: 0}, junior2: {user: junior2, selected: 0}});
       option['requestDates'] = requestDates;
       return option;
    });
  };

  deleteDate = index => {
    this.setState((prevState) => {
      return {requestDates: prevState.requestDates.splice(index, 1)}
    })
  };

  selectedDates () {
    const {
      requestDates
    } = this.state;
    const {
      dutySchedule
    } = this.props;
    let view = [];
    for (let i = 0 ; i < requestDates.length; i++) {
      view.push(
        <RequestDate
          date={requestDates[i].date}
          dutySchedule={dutySchedule}
          deleteDate={()=>this.deleteDate(i)}
          selectUser = {this.selectUser}
          deselectUser = {this.deselectUser}
          index = {i}
        />
      )
    }
    return view;
  }

  selectUser = (index, userS) => {
    this.setState(({requestDates}) => {
      requestDates[index][userS].selected = 1;
      return {requestDates: requestDates}
    })
  };

  deselectUser = (index, userS) => {
    this.setState(({requestDates}) => {
      requestDates[index][userS].selected = 0;
      return {requestDates: requestDates}
    })
  };

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
      sendExchangeRequest,
      currentUser,
      exchangeDate
    } = this.props;
    var numRequest = 0;
    var requestList = [];
    for (let i = 0; i < requestDates.length ; i++) {
      if (requestDates[i].senior.selected === 1) {
        requestList.push({from: currentUser, to: requestDates[i].senior.user, dateFrom: exchangeDate, dateTo: requestDates[i].date})
        numRequest += 1;
      }
      if (requestDates[i].junior1.selected === 1) {
        requestList.push({from: currentUser, to: requestDates[i].junior1.user, dateFrom: exchangeDate, dateTo: requestDates[i].date})
        numRequest += 1;
      }
      if (requestDates[i].junior2.selected === 1) {
        requestList.push({from: currentUser, to: requestDates[i].junior2.user, dateFrom: exchangeDate, dateTo: requestDates[i].date})
        numRequest += 1;
      }
    }
    if (numRequest > 0) {
      return (
        <div className="send-button" onClick={() => sendExchangeRequest(requestList)}>
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

  formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  render() {
    const {
      exchangeDate,
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
            <span className="myduty-date">{this.formatDate(exchangeDate)}</span>
          </div>
          <div className="selected-dates-wrapper">
            {this.selectedDates()}
          </div>
          {this.addButton()}
        </div>
        {this.sendButton()}
        <CalendarModal
          disabledDates = {[exchangeDate].concat(requestDates.map(x=>x.date))}
          visible = {modalOn}
          selectDate = {this.selectDate}
        />
      </div>

    );
  }
}

export default ExchangeDuty;