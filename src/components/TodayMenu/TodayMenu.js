import React, { Component } from "react";
import "./TodayMenu.css";
import styled from "styled-components";

const TodayWrapper = styled.div`
  width: 344px;
  height: 417px;
  display: flex;
  grid-template-columns: 135px 209px;
  grid-template-rows: 49px 125px;
  margin: 10px 8px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;

const TodayMenu = styled.div``;
const Chefs = styled.div``;
const User = styled.div``;

class TodayMenu extends Component {
  state = {
    day: "Monday",
    recipe: "Beef Curry",
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
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
  };

  render() {
    const { day, recipe, users, image } = this.state;

    return (
      <div className="today-menu">
        <div className />
        <div className />
        <div className="date">4/01</div>
        <div className="recipe-wrapper">
          <img className="image" src={image} alt={recipe} />
          <div className="overlay">
            <div className="recipe">{recipe}</div>
            <div className="day">{day}</div>
          </div>
        </div>
        <div className="Chefs">
          <div className="Chef">Senior Chef</div>
          <div className="user-wrapper" key={users.senior.name}>
            <img
              className="user-image"
              src={users.senior.image}
              alt={users.senior.name}
            />
            <div className="user-name">{users.senior.name}</div>
          </div>
        </div>
        <div className="Chefs">
          <div className="Chef">Junior Chef</div>
          {users.junior.map(user => (
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

export default TodayMenu;
