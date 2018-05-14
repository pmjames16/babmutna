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
      //   window.scrollTo(0, 44 + 184 * current_pos);
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
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.currentUser.id !== this.props.currentUser.id) {
  //     this.setState({
  //       visited: -1
  //     });
  //     return true;
  //   }
  //   if (this.state.visited === -1) {
  //     this.setState({
  //       visited: 1
  //     });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // componentWillUnmount = () => {
  //   this.setState({
  //     visited: -1
  //   });
  // };
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
  calendarMapping = () => {
    const { users, recipes, selectRecipeOtherMenu, currentUser } = this.props;
    const currentDate = new Date();
    let weeks = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date();
      day.setDate(currentDate.getDate() + i);
      weeks.push(day);
    }
    let bull = 0;
    const calendar_list = weeks.map((day, index) => {
      let dayUser = users.slice(
        (index * 3) % users.length,
        (index * 3) % users.length + 3
      );
      let count = 0;
      let isme = -1;
      while (dayUser.length < 3) {
        dayUser.push(users[count]);
        count++;
      }
      // dayUser.map(user => user.id === currentUser.id && (current_pos = bull));
      dayUser.map(user => user.id === currentUser.id && (isme = 1));
      bull++;
      // if (isme === 1) {
      //   return null;
      // } else {
      return (
        <Calendar
          date={day}
          recipe={recipes[index % recipes.length]}
          users={dayUser}
          key={index}
          recipeIndex={index % recipes.length}
          selectRecipeOtherMenu={selectRecipeOtherMenu}
          currentUser={currentUser}
        />
      );
      // }
    });
    return calendar_list;
  };
  myCalendar = () => {
    const { users, recipes, selectRecipeOtherMenu, currentUser } = this.props;
    const currentDate = new Date();
    let weeks = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date();
      day.setDate(currentDate.getDate() + i);
      weeks.push(day);
    }
    let bull = 0;
    const calendar_list = weeks.map((day, index) => {
      let dayUser = users.slice(
        (index * 3) % users.length,
        (index * 3) % users.length + 3
      );
      let count = 0;
      let isme = -1;
      while (dayUser.length < 3) {
        dayUser.push(users[count]);
        count++;
      }
      // dayUser.map(user => user.id === currentUser.id && (current_pos = bull));
      dayUser.map(user => user.id === currentUser.id && (isme = 1));
      bull++;
      if (isme === -1) {
        return null;
      } else {
        return (
          <Calendar
            date={day}
            recipe={recipes[index % recipes.length]}
            users={dayUser}
            key={index}
            recipeIndex={index % recipes.length}
            selectRecipeOtherMenu={selectRecipeOtherMenu}
            currentUser={currentUser}
          />
        );
      }
    });
    return calendar_list;
  };

  render() {
    // console.log(this.props.users[3].id, current_pos, this.state.user_selected);
    const { visible } = this.state;
    const tot_cal = this.calendarMapping();
    return (
      <div className="calendar-template">
        {this.myCalendar()}
        <div className="calendar-mapping-wrapper">
          {visible === -1 ? (
            <div className="calendar-dropdown" onClick={this.toggleVisible}>
              See the whold menu V
            </div>
          ) : (
            <div>
              <div className="calendar-dropdown" onClick={this.toggleVisible}>
                Fold ^
              </div>
              {tot_cal}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CalendarTemplate;
