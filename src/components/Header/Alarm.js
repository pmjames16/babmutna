import React, { Component } from "react";
import RequestNoti from "./RequestNoti";

class Alarm extends Component {
    handleRequests = () => {
      const {
        user,
        acceptRequest,
        declineRequest,
        exchangeRequests
      } = this.props;
      var view = [];
      const myRequests = Array.from(exchangeRequests).filter(x => x.to.id === user.id);
      console.log("myrequest",myRequests);
      for (let i = 0; i < myRequests.length; i++) {
          view.push(
            <RequestNoti className="col" style={styles.alarmWrapper}
              from={myRequests[i].from}
              dateFrom={myRequests[i].dateFrom}
              dateTo={myRequests[i].dateTo}
              acceptRequest={acceptRequest}
              declineRequest={declineRequest}
              currentUser={user}
            />
          );
      }
      return view;
    };


    render() {
        return(
          <div className="container" style={styles.alarmWrapper}>
            <div className="row">
              {this.handleRequests()}
              <div onClick={()=>this.props.setCurrentUser(-1)} >
                <span style={styles.logout}>Logout</span>
              </div>
            </div>
          </div>
        );
    }
}

const styles = {
    alarmWrapper: {
        position:"fixed",
        width:100,
        top:54,
        right:"calc(50% - 180px)",
        backgroundColor:"white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        fontFamily: "Roboto",
        textAlign:"right"
    },
    logout:{
        fontWeight:400,
        fontSize:16,
        marginRight:10,
        cursor:"pointer"
    }
};
export default Alarm;
