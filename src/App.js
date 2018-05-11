import React, { Component } from "react";
import "./App.css";
import CalendarTemplate from "./components/CalendarTemplate";
import Calendar from "./components/Calendar";
import Header from "./components/Header";

class App extends Component {
  state = {
    recipe_list: [
      {
        day: "Monday",
        recipe: "Beef Curry",
        users: [
          {
            name: "Arif Hadii",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
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
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      },
      {
        day: "Tuesday",
        recipe: "Potato Curry",
        users: [
          {
            name: "User1",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User2",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User3",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          }
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      },
      {
        day: "Wednesday",
        recipe: "Hot Beef Curry",
        users: [
          {
            name: "User4",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User5",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User6",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          }
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      },
      {
        day: "Thursday",
        recipe: "Chili Curry",
        users: [
          {
            name: "User7",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User8",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User9",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          }
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      },
      {
        day: "Friday",
        recipe: "Special Chicken",
        users: [
          {
            name: "User10",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User11",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User12",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          }
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      },
      {
        day: "Saturday",
        recipe: "Saturday Curry",
        users: [
          {
            name: "User13",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User14",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User15",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          }
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      },
      {
        day: "Sunday",
        recipe: "Sunday Curry",
        users: [
          {
            name: "User16",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User17",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          },
          {
            name: "User18",
            image:
              "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg"
          }
        ],
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595164628.jpeg"
      }
    ]
  };

  handleRecipe = () => {
    const { recipe_list } = this.state;
    const calendar_list = recipe_list.map(data => (
      <Calendar
        day={data.day}
        recipe={data.recipe}
        users={data.users}
        key={data.day}
        image={data.image}
      />
    ));
    return calendar_list;
  };

  render() {
    const { handleRecipe } = this;
    return (
      <div className="App">
        <Header />
        <CalendarTemplate calendar={handleRecipe} />
      </div>
    );
  }
}

export default App;
