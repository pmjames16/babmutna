import React, { Component } from "react";
import "./TodayMenu.css";

class TodayMenu extends Component {
  state = {
    day: "Monday",
    users: {
      senior: {
        name: "Arif Hadii",
        image:
          "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
      },
      junior: [
        {
          name: "Davidee",
          image:
            "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
        },
        {
          name: "Suho Park",
          image:
            "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
        }
      ]
    },
  };

  render() {
    const { day, users } = this.state;
    const { dinner_ready, onClickReady, recipe, selectTodayRecipe } = this.props;

    return (
      <div className="todaymenu-wrapper">
        <div className="todaymenu-title-wrapper">
          <div className="todaymenu-title">Today's Menu</div>
          <div className="todaymenu-date">04/01</div>
        </div>
        <div className="todaymenu-recipe-wrapper">
          <img onClick={selectTodayRecipe} className="todaymenu-image" src={recipe.image} alt={recipe.name} />
          <div
            onClick={onClickReady}
            className={`todaymenu-dinner-${dinner_ready} dinner-ready`}
          >
            {dinner_ready === "yes" ? "Dinner's Ready" : "Cooking Dinner"}
          </div>
          <div className="todaymenu-overlay">
            <div className="todaymenu-recipe">{recipe.name}</div>
            <div className="todaymenu-day">{day}</div>
          </div>
        </div>
        <div className="todaymenu-users-wrapper">
          <div className="todaymenu-user-title">Senior Chef</div>
          <div className="todaymenu-user-wrapper" key={users.senior.name}>
            <img
              className="todaymenu-user-image"
              src={users.senior.image}
              alt={users.senior.name}
            />
            <div className="todaymenu-user-name">{users.senior.name}</div>
          </div>
        </div>
        <div className="todaymenu-users-wrapper">
          <div className="todaymenu-user-title">Junior Chef</div>
          <div className="todaymenu-user-wrapper-wrapper">
            {users.junior.map(user => (
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

export default TodayMenu;
