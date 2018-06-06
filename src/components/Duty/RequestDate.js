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
  toggleUser = userS => {
    const {
      seniorOn,
      junior1On,
      junior2On
    } = this.state;
    const {
      selectUser,
      deselectUser,
      index
    } = this.props;
    if (userS === "senior") {
      if (seniorOn === 1) {
        this.setState({seniorOn: 0});
        deselectUser(index, "senior");
      }
      else {
        this.setState({seniorOn: 1});
        selectUser(index, "senior");
      }
    }
    else if (userS === "junior1") {
      if (junior1On === 1) {
        this.setState({junior1On: 0});
        deselectUser(index, "junior1");
      }
      else {
        this.setState({junior1On: 1});
        selectUser(index, "junior1");
      }
    }
    else {
      if (junior2On === 1) {
        this.setState({junior2On: 0});
        deselectUser(index, "junior2");
      }
      else {
        this.setState({junior2On: 1});
        selectUser(index, "junior2");
      }
    }
  };

  showUser = userS => {
    const {
      seniorOn,
      junior1On,
      junior2On
    } = this.state;
    const {
      date,
      dutySchedule,
      // deleteDate
    } = this.props;
    const schedule = dutySchedule.filter(duty => {
      return duty.date.getDate() === date.getDate();
    })[0];
    const senior = schedule.senior;
    const junior1 = schedule.junior1;
    const junior2 = schedule.junior2;
    if (userS === "senior") {
      if (seniorOn === 1) {
        return (
          <div className="request-senior-wrapper-selected" key={senior.name} onClick={()=>this.toggleUser("senior")}>
            <img
              className="request-user-image"
              src={senior.image}
              alt={senior.name}
            />
            <div className="request-user-name">{senior.name}</div>
            <i class="fas fa-check added"></i>
          </div>
      
        );
      }
      else {
        return (
          <div className="request-senior-wrapper-deselected" key={senior.name} onClick={()=>this.toggleUser("senior")}>
            <img
              className="request-user-image"
              src={senior.image}
              alt={senior.name}
            />
            <div className="request-user-name">{senior.name}</div>
            <i class="fas fa-plus add"></i>
          </div>
        );
      }
    }
    else if (userS === "junior1") {
      if (junior1On === 1) {
        return (
          <div className="request-junior1-wrapper-selected" key={junior1.name} onClick={()=>this.toggleUser("junior1")}>
            <img
              className="request-user-image"
              src={junior1.image}
              alt={junior1.name}
            />
            <div className="request-user-name">{junior1.name}</div>
            <i class="fas fa-check added"></i>
          </div>
        );
      }
      else {
        return (
          <div className="request-junior1-wrapper-deselected" key={junior1.name} onClick={()=>this.toggleUser("junior1")}>
            <img
              className="request-user-image"
              src={junior1.image}
              alt={junior1.name}
            />
            <div className="request-user-name">{junior1.name}</div>
            <i class="fas fa-plus add"></i>            
          </div>
        );
      }
    }
    else {
      if (junior2On === 1) {
        return (
          <div className="request-junior2-wrapper-selected" key={junior2.name} onClick={()=>this.toggleUser("junior2")}>
            <img
              className="request-user-image"
              src={junior2.image}
              alt={junior2.name}
            />
            <div className="request-user-name">{junior2.name}</div>
            <i class="fas fa-check added"></i>
          </div>
        );
      }
      else {
        return (
          <div className="request-junior2-wrapper-deselected" key={junior2.name} onClick={()=>this.toggleUser("junior2")}>
            <img
              className="request-user-image"
              src={junior2.image}
              alt={junior2.name}
            />
            <div className="request-user-name">{junior2.name}</div>
            <i class="fas fa-plus add"></i>
          </div>
        );
      }
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
  render () {
    const {
      date,
      deleteDate
    } = this.props;
    console.log(deleteDate);
    return (
      <div className="request-date-wrapper">
        <div className="request-date">{this.formatDate(date)}
          <i className="delete-icon fas fa-times" onClick={()=>deleteDate()}></i>
        </div>
        {this.showUser("senior")}
        {this.showUser("junior1")}
        {this.showUser("junior2")}
      </div>
    )
  };
}

export default RequestDate;