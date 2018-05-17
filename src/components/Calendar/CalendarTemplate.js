import React, { Component } from "react";
import "./CalendarTemplate.css";
import Calendar from "./Calendar";
// let current_pos = 0;

class CalendarTemplate extends Component {
  state = {
    user_selected: -1,
    // visited: -1,
    // current_position: 0,
    visible: -1
  };
  componentDidMount() {
    const { currentUser } = this.props;
    // const { current_position } = this.state;
    if (currentUser.id !== -1) {
      //   window.scrollTo(0, 54 + 174 * current_pos);
      // window.scrollTo({
      //   top: 44 + 184 * current_pos,
      //   left: 0,
      //   behavior: "smooth"
      // });
      this.setState({
        user_selected: currentUser.id
      });
    }
  }
  componentDidUpdate(nextProps, nextState) {
    const { currentUser } = this.props;
    // const { current_position } = this.state;
    if (nextProps.currentUser.id !== currentUser.id && currentUser.id !== -1) {
      this.setState({
        user_selected: currentUser.id
      });
    }
  }

  toggleVisible = () => {
    const { visible } = this.state;
    visible === -1
      ? this.setState({
          visible: 1
        })
      : this.setState({
          visible: -1
        });
  };
  showCalendar () {
    const { recipes, selectRecipeOtherMenu, currentUser, dutySchedule } = this.props;
    var view = [];
    for (let i = 0; i < dutySchedule.length; i++) {
      view.push(
        <Calendar
          date={dutySchedule[i].date}
          recipe={recipes[i % recipes.length]}
          users={[dutySchedule[i].senior, dutySchedule[i].junior1, dutySchedule[i].junior2]}
          key={i}
          recipeIndex={i % recipes.length}
          selectRecipeOtherMenu={selectRecipeOtherMenu}
          currentUser={currentUser}
        />
      );
    }
    return view;
  }
  showMyCalendar () {
    const { recipes, selectRecipeOtherMenu, currentUser, dutySchedule } = this.props;
    var view = [];
    for (let i = 0; i < dutySchedule.length; i++) {
      if (dutySchedule[i].senior === currentUser || dutySchedule[i].junior1 === currentUser || dutySchedule[i].junior2 === currentUser) {
        view.push(
          <Calendar
            date={dutySchedule[i].date}
            recipe={recipes[i % recipes.length]}
            users={[dutySchedule[i].senior, dutySchedule[i].junior1, dutySchedule[i].junior2]}
            key={i}
            recipeIndex={i % recipes.length}
            selectRecipeOtherMenu={selectRecipeOtherMenu}
            currentUser={currentUser}
          />
        );
      }
    }
    return view;
  }


  render() {
    // console.log(this.props.users[3].id, current_pos, this.state.user_selected);
    const { visible } = this.state;
    const tot_cal = this.showCalendar();
    return (
      <div className="calendar-template">
        {tot_cal}
        {/*<div className="calendar-mapping-wrapper">*/}
          {/*{visible === -1 ? (*/}
            {/*<div className="calendar-dropdown" onClick={this.toggleVisible}>*/}
              {/*View All V*/}
            {/*</div>*/}
          {/*) : (*/}
            {/*<div>*/}
              {/*<div className="calendar-dropdown" onClick={this.toggleVisible}>*/}
                {/*View Mine Only ^*/}
              {/*</div>*/}
              {/*{tot_cal}*/}
            {/*</div>*/}
          {/*)}*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default CalendarTemplate;
