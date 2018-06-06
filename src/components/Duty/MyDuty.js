import React, { Component } from "react";
import "./MyDuty.css";
import Calendar from "../Calendar/Calendar";

class MyDuty extends Component {
  constructor(props) {
    super(props);
    const { currentUser, dutySchedule } = this.props;
    this.state = {
      numDuty: 0,
      dutyIndex: 0,
      prevOn: 0,
      nextOn: 1,
      currentUser: currentUser,
      mySchedule: dutySchedule.filter(day => {
        return (
          day.senior.id === currentUser.id ||
          day.junior1.id === currentUser.id ||
          day.junior2.id === currentUser.id
        );
      })
    };
    this.state.numDuty = this.state.mySchedule.length;
    if (this.state.mySchedule.length > 0) {
      this.state.nextOn = 1;
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let option = {};
    const nextUser = nextProps.currentUser;
    if (nextUser.id !== prevState.currentUser.id) {
      option["currentUser"] = nextUser;
      if (nextUser.id !== -1) {
        const mySchedule = nextProps.dutySchedule.filter(day => {
          return (
            day.senior.id === nextUser.id ||
            day.junior1.id === nextUser.id ||
            day.junior2.id === nextUser.id
          );
        });
        const numDuty = mySchedule.length;
        option["mySchedule"] = mySchedule;
        option["numDuty"] = numDuty;
      }
      return option;
    } else return null;
  }

  prevDuty = () => {
    let option = {};
    if (this.state.dutyIndex <= 1) {
      option["prevOn"] = 0;
    }
    option["nextOn"] = 1;
    this.setState(({ dutyIndex }) => {
      return { dutyIndex: dutyIndex - 1, ...option };
    });
  };

  nextDuty = () => {
    const { numDuty } = this.state;
    let option = {};
    if (this.state.dutyIndex >= numDuty - 2) {
      option["nextOn"] = 0;
    }
    option["prevOn"] = 1;
    this.setState(({ dutyIndex }) => {
      return { dutyIndex: dutyIndex + 1, ...option };
    });
  };

  prevButton = () => {
    const { prevOn } = this.state;
    if (prevOn === 1) {
      return (
        <i className="slide-left fas fa-chevron-left" onClick={this.prevDuty} />
      );
    } else {
      return <i className="slide-left disabled fas fa-chevron-left" />;
    }
  };

  nextButton = () => {
    const { nextOn } = this.state;
    if (nextOn === 1) {
      return (
        <i
          className="slide-right fas fa-chevron-right"
          onClick={this.nextDuty}
        />
      );
    } else {
      return <i className="slide-right disabled fas fa-chevron-right" />;
    }
  };

  duty = () => {
    const { recipes, selectRecipeOtherMenu } = this.props;
    const { currentUser, mySchedule } = this.state;
    let index = 0;
    let duties = [];
    duties.push(
      <Calendar
        className={"duty " + this.state.dutyIndex.toString()}
        date={new Date(mySchedule[this.state.dutyIndex].date)}
        recipe={recipes[index % recipes.length]}
        users={[
          mySchedule[this.state.dutyIndex].senior,
          mySchedule[this.state.dutyIndex].junior1,
          mySchedule[this.state.dutyIndex].junior2
        ]}
        recipeIndex={index % recipes.length}
        selectRecipeOtherMenu={selectRecipeOtherMenu}
        currentUser={currentUser}
        key={index}
      />
    );
    return duties;
  };

  render() {
    const { currentUser, exchangeDuty } = this.props;
    if (currentUser.id === -1) {
      return (
        <div className="myduty-wrapper">
          <div className="myduty-notloggedin">Login to view your Duty</div>
        </div>
      );
    } else {
      return (
        <div className="myduty-wrapper">
          <div className="myduty-header">
            {this.prevButton()} My Duty {this.nextButton()}
          </div>
          <div className="content-wrapper">{this.duty()}</div>
          <div
            className="exchange"
            onClick={() =>
              exchangeDuty(this.state.mySchedule[this.state.dutyIndex].date)
            }
          >
            <i className="exchange-icon fas fa-retweet" />
            Exchange Duty
          </div>
        </div>
      );
    }
  }
}

export default MyDuty;
