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
    const { day, recipe, users, image } = this.props;
    return (
      <div className="calendar-wrapper">
        <div className="date">4/01</div>
        <div className="recipe-wrapper">
          <img className="image" src={image} alt={recipe} />
          <div className="overlay">
            <div className="recipe">{recipe}</div>
            <div className="day">{day}</div>
          </div>
        </div>
        <div className="users-wrapper">
          {users.map(user => (
            <div className="user-wrapper" key={user.name}>
              <img className="user-image" src={user.image} alt={user.name} />
              <div className="user-name">{user.name}</div>
            </div>
          ))}
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