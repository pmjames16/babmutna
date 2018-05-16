import React, { Component } from "react";
import "./CalendarModal.css";
import Calendar from 'react-calendar';

class CalendarModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            isVisible:false,
        }
    }
  static defaultProps = {

  };

  render() {
    const {

    } = this.props;
      const view = this.state.isVisible ? (<div hidden className="modal-wrapper">
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
      </div>):(<div></div>);
    return (
        <div>{view}</div>
    );
  }
}

export default CalendarModal;