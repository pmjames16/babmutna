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
    formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };
  render () {
    const {
      date,
      dutySchedule
    } = this.props;
    const schedule = dutySchedule.filter(duty => {
        return duty.date.getDate() === date.getDate();
    })[0];

    console.log(schedule);
    const senior = schedule.senior;
    const junior1 = schedule.junior1;
    const junior2 = schedule.junior2;

    return (
      <div className="request-date-wrapper">
        <div className="request-date">{this.formatDate(date)}
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