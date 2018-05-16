import React, { Component } from "react";
import "./App.css";
import TodayMenu from "./components/TodayMenu/TodayMenu";
import CalendarTemplate from "./components/Calendar/CalendarTemplate";
import RecipeTemplate from "./components/Recipe/RecipeTemplate";
import Header from "./components/Header/Header";
import Menu from "./components/Header/Menu";
import Login from "./components/Header/Login";
import Alarm from "./components/Header/Alarm";
import MyDuty from "./components/Duty/MyDuty";
import ExchangeDuty from "./components/Duty/ExchangeDuty";
import Setfirebase from "./components/Admin/SetFirebase";
import { init as initFirebase } from "./firebase";
import * as firebase from 'firebase'



class App extends Component {
  constructor(props) {
    super(props);
    initFirebase();
    this.state = {
      dinner_ready: "no",
      body: "Home",
      menu: false,
      recipeId: -1, //The index of recipe
      recipeState: 0, //0 is whole recipe, 1 is detail, should set RecipeId
      todayRecipe: 0, //The index of recipe
      recipes: [{
        name: "Chicken Curry",
        image: "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb",
        video: "https://www.youtube.com/watch?v=erHhYyqJq6A",
        time: "2h 30min",
        ingredients: ["default"],
        tasks: [{task: "default", image: ""}]
      }],
      users: [{
        name: "Babmutna",
        image:
          "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait1.jpg?alt=media&token=ca4a4b01-493e-4a4a-a8ea-a750832a94cc",
        skill: "senior",
        id: 0
      }],
      currentUser: {
        id: -1
      },
      login: false,
      alarm: false,
      dutySchedule: dutySchedule,
      exchangeDate: null
    };
  }

  componentDidMount() {
    const database = firebase.database();
    let users_ = [];
    let recipes_ = [];
    const promise1 = database.ref('/users/').once('value').then((snapshot) => {
      const usersDummy = snapshot.val();
      for (let key in usersDummy) {
        const user = usersDummy[key];
        users_.push(user);
      }
    });
    const promise2 = database.ref('/recipes/').once('value').then((snapshot) => {
      const recipesDummy = snapshot.val();
      for (let key in recipesDummy) {
        const recipe = recipesDummy[key];
        recipes_.push(recipe);
      }
    });
    Promise.all([promise1, promise2]).then(() => {
      this.setState({
        recipes: recipes_,
        users: users_,
      });
    });
  }

  changeScreen = screen => {
    let option = {
      body: screen,
      menu: false,
      recipeState: 0,
      recipeId: -1
    };

    this.setState(option);
  };

  exchangeDuty = date => {
    this.setState({
      body: "Exchange Duty",
      exchangeDate: date
    })
  };

  sendExchangeRequest = () => {
    alert('Request Sent!')
    this.setState({
      body: "Home"
    })
  };

  toggleMenu = () => {
      this.setState(prevState => {
          return {menu: !prevState.menu};
      });
  };

  handleDinnerReady = () => {
      this.setState({
          dinner_ready: this.state.dinner_ready === "yes" ? "no" : "yes"
      });
  };


  selectRecipe = key => {
    this.setState({
      recipeState: 1,
      recipeId: key
    });
  };

  selectRecipeOtherMenu = key => {
    this.setState({
      recipeState: 1,
      recipeId: key,
      body: "RecipeTemplate"
    });
  };

  wholeRecipe = () => {
    this.setState({
      recipeState: 0,
      recipeId: -1
    });
  };


  setCurrentUser = id => {
    if (id !== -1) {
      //Login
      const currentUser = this.state.users.filter(user => {
        return user.id === id;
      });
      if (currentUser.length < 1) {
        console.warn("No user Select in Login");
        return;
      }
      this.setState({
        currentUser: currentUser[0],
        login: false
      });
      console.log("Login");
    } else {
      this.setState({
        currentUser: {
          id: -1
        },
        login: false,
        alarm: false
      });
      console.log("Logout");
    }
  };

  toggleLogin = () => {
    this.setState(({ login }) => {
      return { login: !login };
    });
  };

  toggleAlarm = () => {
    this.setState(({ alarm }) => {
      return { alarm: !alarm };
    });
  };


  render() {
    let body = null;
    const {
      dinner_ready,
      recipeId,
      recipeState,
      todayRecipe,
      users,
      currentUser,
      dutySchedule,
      exchangeDate,
      recipes
    } = this.state;
    const todayUsers = users.slice(0, 3);

    if (this.state.body === "Calendar") {
      body = (
        <CalendarTemplate
          users={users}
          recipes={recipes}
          selectRecipeOtherMenu={this.selectRecipeOtherMenu}
          currentUser={currentUser}
        />
      );
    } else if (this.state.body === "RecipeTemplate") {
      body = (
        <RecipeTemplate
          recipes={recipes}
          recipeState={recipeState}
          recipeId={recipeId}
          selectRecipe={this.selectRecipe}
          wholeRecipe={this.wholeRecipe}
        />
      );
    } else if (this.state.body === "Exchange Duty") {
      body = (
        <ExchangeDuty
          currentUser={currentUser}
          dutySchedule={dutySchedule}
          exchangeDate={exchangeDate}
          sendExchangeRequest={this.sendExchangeRequest}
        />
      )
    }
    else {
      body = (
        <div>
          <TodayMenu
            recipe={recipes[todayRecipe]}
            index={todayRecipe}
            todayUsers={todayUsers}
            dinner_ready={dinner_ready}
            selectRecipeOtherMenu={this.selectRecipeOtherMenu}
            onClickReady={this.handleDinnerReady}
          />
          <MyDuty
            currentUser={currentUser}
            dutySchedule={dutySchedule}
            recipes={recipes}
            selectRecipeOtherMenu={this.selectRecipeOtherMenu}
            users={users}
            exchangeDuty={this.exchangeDuty}
          />
        </div>
      );
    }

      return (
        <div className="App">
          <Header
              toggleMenu={this.toggleMenu}
              title={this.state.body}
              users={users}
              toggleLogin={this.toggleLogin}
              toggleAlarm={this.toggleAlarm}
              currentUser={currentUser}
          />

          {body}
          {this.state.menu ? (
              <Menu
                  user={currentUser}
                  changeScreen={this.changeScreen}
                  toggleMenu={this.toggleMenu}
              />
          ) : null}

          {this.state.login ? (
              <Login users={users} setCurrentUser={this.setCurrentUser}/>
          ) : null}
          {this.state.alarm ? (
              <Alarm user={currentUser} setCurrentUser={this.setCurrentUser}/>
          ) : null}
        </div>
      );
    }
}
const users = [
  {
    name: "Arif Hadii",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait1.jpg?alt=media&token=ca4a4b01-493e-4a4a-a8ea-a750832a94cc",
    skill: "senior",
    id: 0
  },
  {
    name: "Davidee",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait2.jpg?alt=media&token=6d444da9-d56d-4437-a665-bc5552d38d2d",
    skill: "junior",
    id: 1
  },
  {
    name: "Etranger",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait4.jpg?alt=media&token=155b7575-d3dc-4c59-8b5d-39bbd3c1ad77",
    skill: "junior",
    id: 2
  },
  {
    name: "James",
    image:
      "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg",
    skill: "senior",
    id: 3
  },
  {
    name: "Sabagi",
    image:
      "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg",
    skill: "junior",
    id: 4
  },
  {
    name: "Amy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 5
  },
  {
    name: "Adis",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 6
  },
  {
    name: "Ababa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 7
  },
  {
    name: "Ashu",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 8
  },
  {
    name: "Abilabi",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 9
  },
  {
    name: "Cooo",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 10
  },
  {
    name: "Jala",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 11
  },
  {
    name: "Pippy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 12
  },
  {
    name: "Pakist",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 13
  },
  {
    name: "Dulli",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 14
  },
  {
    name: "Dooly",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 15
  },
  {
    name: "Biosy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 16
  },
  {
    name: "Enerly",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 17
  },
  {
    name: "Perio",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 18
  },
  {
    name: "Yonsei",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 19
  },
  {
    name: "Hue",
    image:
      "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
    skill: "junior",
    id: 20
  }
];
const dutySchedule = [
  {
    date: "2018-05-16",
    senior: users[0],
    junior1: users[1],
    junior2: users[2],
  },
  {
    date: "2018-05-17",
    senior: users[3],
    junior1: users[4],
    junior2: users[5],
  },
  {
    date: "2018-05-18",
    senior: users[6],
    junior1: users[7],
    junior2: users[8],
  },
  {
    date: "2018-05-19",
    senior: users[9],
    junior1: users[10],
    junior2: users[11],
  },
  {
    date: "2018-05-20",
    senior: users[12],
    junior1: users[13],
    junior2: users[14],
  },
  {
    date: "2018-05-21",
    senior: users[15],
    junior1: users[16],
    junior2: users[17],
  },
  {
    date: "2018-05-22",
    senior: users[18],
    junior1: users[19],
    junior2: users[20],
  },
  {
    date: "2018-05-23",
    senior: users[0],
    junior1: users[1],
    junior2: users[2],
  },
  {
    date: "2018-05-24",
    senior: users[3],
    junior1: users[4],
    junior2: users[5],
  },
  {
    date: "2018-05-25",
    senior: users[6],
    junior1: users[7],
    junior2: users[8],
  },
  {
    date: "2018-05-26",
    senior: users[9],
    junior1: users[10],
    junior2: users[11],
  },
  {
    date: "2018-05-27",
    senior: users[12],
    junior1: users[13],
    junior2: users[14],
  },
  {
    date: "2018-05-28",
    senior: users[15],
    junior1: users[16],
    junior2: users[17],
  },
  {
    date: "2018-05-29",
    senior: users[18],
    junior1: users[19],
    junior2: users[20],
  }
];

export default App;
