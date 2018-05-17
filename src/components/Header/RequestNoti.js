import React, { Component } from "react";
import './RequestNoti.css';

class RequestNoti extends Component {
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
      from,
      dateFrom,
      dateTo,
      acceptRequest,
      declineRequest,
      currentUser
    } = this.props;
    const to = currentUser;
    return (
      <div className="col request-noti-wrapper">
        <div className="row">{from.name}</div>
        <div className="row">{this.formatDate(dateTo)}</div>
        <div className="row"><i class="fas fa-sort-down"></i></div>
        <div className="row">{this.formatDate(dateFrom)}</div>
        <div className="row accept-button" onClick={()=>acceptRequest(from, to, dateFrom, dateTo)}><i class="fas fa-check"></i></div>
        <div className="row decline-button" onClick={()=>declineRequest(from, to, dateFrom, dateTo)}><i class="fas fa-times"></i></div>
      </div>
    );
  };

}
export default RequestNoti;