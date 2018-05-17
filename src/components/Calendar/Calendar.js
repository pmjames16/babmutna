import React, { Component } from "react";
import "./Calendar.css";

class Calendar extends Component {
  static defaultProps = {
    day: () => console.warn("day is not defined"),
    recipe: () => console.warn("recipe is not defined"),
    image: () => console.warn("image is not defined"),
    users: () => console.warn("users are not defined")
  };

  render() {
    const {
      date,
      recipe,
      users,
      selectRecipeOtherMenu,
      recipeIndex,
      currentUser
    } = this.props;
    const days_ = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];
    const month = date.getMonth() + 1;
    const days = date.getDate();
    const day = days_[date.getDay()];
    return (
      <div className="calendar-wrapper-test">
        <div className="date">
          {month}/{days}
        </div>
        <div className="recipe-wrapper">
          <img
            onClick={() => selectRecipeOtherMenu(recipeIndex)}
            className="image"
            src={recipe.image}
            alt={recipe.name}
          />
          <div className="overlay">
            <div className="recipe">{recipe.name}</div>
            <div className="day">{day}</div>
          </div>
        </div>
        <div className="users-wrapper">
          {users.map(
            user =>
              user.id === currentUser.id ? (
                <div className="user-wrapper" key={user.name}>
                  <img
                    className="user-image"
                    src={user.image}
                    alt={user.name}
                  />
                  <div className="user-name currentuser">{user.name}</div>
                </div>
              ) : (
                <div className="user-wrapper" key={user.name}>
                  <img
                    className="user-image"
                    src={user.image}
                    alt={user.name}
                  />
                  <div className="user-name">{user.name}</div>
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;

// {
//   name: "Arif Hadii",
//   image:
//     "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
// }
