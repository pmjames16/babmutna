import React, { Component } from "react";
import "./MyDuty.css";
import CalendarModal from "./CalendarModal";
import Calendar from "../Calendar/Calendar"
import CalendarTemplate from "../Calendar/CalendarTemplate"



class MyDuty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numDuty: 0,
      dutyIndex: 0,
      prevOn: 0,
      nextOn: 1
    };
    const {
      currentUser,
      dutySchedule,
    } = this.props;
    this.mySchedule = dutySchedule.filter(day => {
      return (day.senior.id === currentUser.id || day.junior1.id === currentUser.id || day.junior2.id === currentUser.id)
    });
    this.state.numDuty = this.mySchedule.length;
    if (this.mySchedule.length > 0) {
      this.state.nextOn = 1;
    }
  }

  prevDuty = () => {
    const {
      dutyIndex,
    } = this.state;
    if (dutyIndex <= 1) {
      this.setState({prevOn: 0});
    }
    this.setState({nextOn: 1});
    this.setState({dutyIndex: dutyIndex - 1});
  };

  nextDuty = () => {
    const {
      numDuty,
      dutyIndex,
    } = this.state;
    console.log(numDuty)
    if (dutyIndex >= numDuty - 2) {
      this.setState({nextOn: 0});
    }
    this.setState({prevOn: 1});
    this.setState({dutyIndex: dutyIndex + 1});
  };

  prevButton  = () => {
    const {
      prevOn,
    } = this.state;
    if (prevOn === 1) {
      return (<i className="slide-left fas fa-chevron-left" onClick={this.prevDuty}></i>);
    }
    else {
      return (<i className="slide-left disabled fas fa-chevron-left"></i>)
    }
  };

  nextButton  = () => {
    const {
      nextOn
    } = this.state;
    if (nextOn === 1) {
      return (<i className="slide-right fas fa-chevron-right" onClick={this.nextDuty}></i>);
    }
    else {
      return (<i className="slide-right disabled fas fa-chevron-right"></i>)
    }
  };

  duty = () => {
    const {
    } = this.state;
    const {
      currentUser,
      dutySchedule,
      recipes,
      selectRecipeOtherMenu,
    } = this.props;
    this.mySchedule = dutySchedule.filter(day => {
      return (day.senior.id === currentUser.id || day.junior1.id === currentUser.id || day.junior2.id === currentUser.id)
    });
    this.state.numDuty = this.mySchedule.length;
    const mySchedule = this.mySchedule;
    let index = 2;
    var duties = [];
    duties.push(
      <Calendar className={"duty " + this.state.dutyIndex.toString()}
                date={new Date(mySchedule[this.state.dutyIndex].date)}
                recipe={recipes[index % recipes.length]}
                users={[mySchedule[this.state.dutyIndex].senior, mySchedule[this.state.dutyIndex].junior1, mySchedule[this.state.dutyIndex].junior2]}
                recipeIndex={index % recipes.length}
                selectRecipeOtherMenu={selectRecipeOtherMenu}
                currentUser={currentUser}
                key={index}
      />
    );
    return duties
  };

  render() {
    const {
      currentUser,
      exchangeDuty
    } = this.props;
    if (currentUser.id === -1) {
      return (
        <div className="myduty-wrapper">
          <div className="myduty-title">Login to view your Duty</div>
        </div>
      );
    }
    else {
      return (
        <div className="myduty-wrapper">
          <div className="myduty-header">
            {this.prevButton()} My Duty {this.nextButton()}
          </div>
          <div className="content-wrapper">
            {this.duty()}
          </div>
          <div className="exchange" onClick={() => exchangeDuty(this.mySchedule[this.state.dutyIndex].date)} >
            <i className="exchange-icon fas fa-retweet" ></i>
            Exchange Duty
          </div>
        </div>
      );
    }
  }
}

export default MyDuty;
