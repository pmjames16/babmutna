import React, { Component } from "react";
import "./CalendarModal.css";
import Calendar from 'react-calendar';

class CalendarModal extends Component {
  constructor(props) {
    super(props);
    const {
      visible
    } = this.props
    this.state={
      date: new Date(),
      buttonDisabled: 1
    };
  }

  onChange = date => {
    this.setState({ date });
    this.setState({ buttonDisabled: 0});
  };

  selectButton () {
    const {
      selectDate
    } = this.props;
    const {
      buttonDisabled,
      date
    } = this.state;
    if (buttonDisabled === 1) {
      return (
        <div className="select-button-disabled">
          Select Date
        </div>
      );
    }
    else {
      return (
        <div className="select-button" onClick={() => selectDate(date)}>
          <i className="check-icon fas fa-check" ></i>
        </div>
      );
    }
  };

  render() {
    const {
      disabledDates,
      visible,
    } = this.props;
    const dates = disabledDates.map(d => new Date(d));
    const view = visible ? (
      <div className="modal-wrapper">
        <div className="modal-to">
          <Calendar
            className="calendar"
            calendarType="US"
            onClickDay={this.onChange}
            minDate={new Date()}
            maxDate={new Date("2018-05-29")}
            tileDisabled={({date, view}) => {
              for (let i = 0; i < dates.length; i++) {
                if (dates[i].getDate() === date.getDate() && dates[i].getMonth() === date.getMonth() && dates[i].getYear() === date.getYear()) {
                  return true;
                }
              }
              return false;
            }}
          />
          {this.selectButton()}
        </div>
      </div>
    ):(<div></div>);
    return (
        <div>{view}</div>
      );
  }
}

export default CalendarModal;