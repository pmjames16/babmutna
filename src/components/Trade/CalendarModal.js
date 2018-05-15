import React, { Component } from "react";
import "./CalendarModal.css";
import Calendar from 'react-calendar';

class CalendarModal extends Component {

  static defaultProps = {

  };

  render() {
    const {

    } = this.props;

    return (
      <div className="modal-wrapper">
        <div className="modal-from">
          <div className="instruction-wrapper">
            <h1>Select duty date to trade from</h1>
          </div>
          <Calendar className="calendar"/>
        </div>
        <div className="modal-to" hidden>
          <div className="instruction-wrapper">
            <h1>Select duty date to trade to</h1>
          </div>
          <Calendar className="calendar"/>
        </div>
      </div>
    );
  }
}

export default CalendarModal;