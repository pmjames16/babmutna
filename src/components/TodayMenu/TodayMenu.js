import React, { Component } from "react";
import "./TodayMenu.css";

class TodayMenu extends Component {
  render() {
    const {
      dinner_ready,
      onClickReady,
      recipe,
      selectRecipeOtherMenu,
      todayUsers,
      index
    } = this.props;
    let senior = [],
      junior = [];
    junior = todayUsers.filter(user => {
      return user.skill === "junior";
    });
    senior = todayUsers.filter(user => {
      return user.skill === "senior";
    });
    const date = new Date();
    const month = date.getMonth() + 1;
    const dates = date.getDate();
    const day = date.getDay();

    let right = false;
    todayUsers.map(user => {
      if (user.name === this.props.currentUser.name) right = true;
    });

    return (
      <div className="todaymenu-wrapper">
        <div className="todaymenu-title-wrapper">
          <div className="todaymenu-title">Today's Menu</div>
          <div className="todaymenu-date">
            {`0${month}`}/{dates}
          </div>
        </div>
        <div className="todaymenu-recipe-wrapper">
          <img
            onClick={() => selectRecipeOtherMenu(index)}
            className="todaymenu-image"
            src={recipe.image}
            alt={recipe.name}
          />
          <div
            onClick={right ? onClickReady : null}
            className={`todaymenu-dinner-${
              dinner_ready === "yes" ? "yes" : right ? "clickable-no" : "no"
            } dinner-ready ${right ? "clickable" : "unclickable"}`}
          >
            {dinner_ready === "yes" ? "Dinner Ready!" : "Now Cooking"}
          </div>
          <div className="todaymenu-overlay">
            <div className="todaymenu-recipe">{recipe.name}</div>
            <div className="todaymenu-day">{days[day]}</div>
          </div>
        </div>
        <div className="todaymenu-users-wrapper">
          <div className="todaymenu-user-title">Senior Chef</div>
          <div className="todaymenu-user-wrapper-wrapper">
            {senior.map(user => (
              <div className="todaymenu-user-wrapper" key={user.name}>
                <img
                  className="todaymenu-user-image"
                  src={user.image}
                  alt={user.name}
                />
                <div className="todaymenu-user-name">{user.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="todaymenu-users-wrapper">
          <div className="todaymenu-user-title">Junior Chef</div>
          <div className="todaymenu-user-wrapper-wrapper">
            {junior.map(user => (
              <div className="todaymenu-user-wrapper" key={user.name}>
                <img
                  className="todaymenu-user-image"
                  src={user.image}
                  alt={user.name}
                />
                <div className="todaymenu-user-name">{user.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default TodayMenu;
