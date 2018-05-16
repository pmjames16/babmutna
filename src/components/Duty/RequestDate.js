import React, { Component } from "react";
import "./RequestDate.css";

class RequestDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seniorOn: 0,
      junior1On: 0,
      junior2On: 0
    }
  }
  render () {
    const {
      date,
      dutySchedule
    } = this.props
    const senior = dutySchedule.filter(duty => duty.date === date)[0].senior;
    const junior1 = dutySchedule.filter(duty => duty.date === date)[0].junior1;
    const junior2 = dutySchedule.filter(duty => duty.date === date)[0].junior2;

    return (
      <div className="request-date-wrapper">
        <div className="request-date">{date}
        </div>
        <div className="request-user-wrapper" key={senior.name}>
          <img
            className="request-user-image"
            src={senior.image}
            alt={senior.name}
          />
          <div className="request-user-name">{senior.name}</div>
        </div>
        <div className="request-junior-wrapper">
          <div className="request-junior1-wrapper" key={junior1.name}>
            <img
              className="request-user-image"
              src={junior1.image}
              alt={junior1.name}
            />
            <div className="request-user-name">{junior1.name}</div>
          </div>
          <div className="request-junior2-wrapper" key={junior2.name}>
            <img
              className="request-user-image"
              src={junior2.image}
              alt={junior2.name}
            />
            <div className="request-user-name">{junior2.name}</div>
          </div>
        </div>
      </div>
    )
  };
}

export default RequestDate;