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
import Modal from "./components/TodayMenu/Modal"

import { init as initFirebase } from "./firebase";
import * as firebase from 'firebase'

class App extends Component {
  constructor(props) {
    super(props);
    initFirebase();
    this.initRecipeState = this.initRecipeState.bind(this);
    this.state = {
      exchangeRequests: new Set([]),
      dinner_ready: "no",
      body: "Home",
      menu: false,
      recipeId: -1, //The index of recipe
      recipeState: 0, //0 is whole recipe, 1 is detail, should set RecipeId
      todayRecipe: 0, //The index of recipe
      recipes: [{
        name: "Hot Beef Curry",
        image: "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/hot%20beef.jpg?alt=media&token=9c81aa80-bace-4920-b580-549660af606a",
        video: "https://www.youtube.com/watch?v=erHhYyqJq6A",
        time: "2h 30min",
        ingredients: ["default"],
        tasks: [{task: "default", image: ""}]
      }],
        recipeKeys : [],
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
      dutySchedule: dutySchedule(),
      exchangeDate: null,
      modal: false,
    };
  }

  componentDidMount() {
    const database = firebase.database();
    let users_ = [];
    let recipes_ = [];
      let recipeKeys_ = [];
    const promise1 = database.ref('/users/').once('value').then((snapshot) => {
      const usersDummy = snapshot.val();
      for (let key in usersDummy) {
        const user = usersDummy[key];
        users_.push(user);
      }
    });
    const promise2 = database.ref('/recipes_/').once('value').then((snapshot) => {
      const recipesDummy = snapshot.val();
      for (let key in recipesDummy) {
        const recipe = recipesDummy[key];
        recipes_.push(recipe);
          recipeKeys_.push(key)
      }
    });
    Promise.all([promise1, promise2]).then(() => {
      this.setState({
        recipes: recipes_,
        users: users_,
          recipeKeys:recipeKeys_
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

  sendExchangeRequest = (requestList) => {
    alert('Request Sent!');
    this.setState(({exchangeRequests})=> {
      for (let i = 0; i < requestList.length; i++) {
        exchangeRequests.add(requestList[i]);
      }
      return {exchangeRequests: exchangeRequests, body: "Home"};
    });
  };

  declineRequest = (from,to,dateFrom,dateTo) => {
    this.setState(({exchangeRequests}) => {
      exchangeRequests.delete({from: from, to: to, dateFrom: dateFrom, dateTo: this.formatDate(dateTo)});
      return {exchangeRequests: exchangeRequests};
    })
  };

  acceptRequest = (from,to,dateFrom,dateTo) => {
    this.setState(({exchangeRequests, dutySchedule}) => {
      exchangeRequests.forEach(function(i){
        if (i.from === from &&  i.dateFrom  === dateFrom) {
          exchangeRequests.delete(i);
        }
      });
      for (let j = 0; j < dutySchedule.length; j++) {
        if (dutySchedule[j].date === dateFrom) {
          if (dutySchedule[j].senior === from) {
            dutySchedule[j].senior = to;
          }
          else if (dutySchedule[j].junior1 === from) {
            dutySchedule[j].junior1 = to;
          }
          else {
            dutySchedule[j].junior2 = to;
          }
        }
        else if (dutySchedule[j].date === dateTo) {
          if (dutySchedule[j].senior === to) {
            dutySchedule[j].senior = from;
          }
          else if (dutySchedule[j].junior1 === to) {
            dutySchedule[j].junior1 = from;
          }
          else {
            dutySchedule[j].junior2 = from;
          }
        }
      }
      return {exchangeRequests: exchangeRequests, dutySchedule: dutySchedule};
    });
  };

  toggleMenu = () => {
      this.setState(prevState => {
          return {menu: !prevState.menu};
      });
  };

  handleDinnerReady = () => {
    this.state.dinner_ready==="yes"? this.setState({ dinner_ready: "no" }) : this.setState({ modal: true })
  };

  modalButtonClick = (but) => {
    but? this.setState({ dinner_ready: "yes", modal: false }) : this.setState({ modal: false })
  }

//About Recipe
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

  changeTask = (recipeIndex, task, taskId) => {
      let recipes = Object.assign([],this.state.recipes);
      console.log("recipes",recipeIndex,"tasks",taskId);
      recipes[recipeIndex].tasks[taskId] = task;
      this.setState({
          recipes : recipes
      });
  };

    changeIngredient = (recipeIndex, ingredient,ingredientId ) => {
        let recipes = Object.assign([],this.state.recipes);
        recipes[recipeIndex].ingredients[ingredientId] = ingredient;
        this.setState({
            recipes : recipes
        });
    };

    initRecipeState = (recipeIndex,tasks,ingredients)=>{
        let recipes = Object.assign([],this.state.recipes);
        let recipe = recipes[recipeIndex];
        recipe.ingredients = ingredients;
        recipe.tasks = tasks;
        this.setState({
            recipes:recipes,
        });
    };
    ////About Recipe End

//About Login and profile
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
//Abouyt Login and profile End

  formatDate = (date) => {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
  };

  render() {
    let body = null;
    const {
      exchangeRequests,
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
          dutySchedule={dutySchedule}
        />
      );
    }
    else if (this.state.body === "RecipeTemplate") {
      body = (
        <RecipeTemplate
          recipes={recipes}
          recipeKeys={this.state.recipeKeys}
          recipeState={recipeState}
          recipeId={recipeId}
          selectRecipe={this.selectRecipe}
          initRecipeState = {this.initRecipeState}
          wholeRecipe={this.wholeRecipe}
          changeTask = {this.changeTask}
          changeIngredient = {this.changeIngredient}
        />
      );
    }
    else if (this.state.body === "Exchange Duty") {
      body = (
        <ExchangeDuty
          currentUser={currentUser}
          dutySchedule={dutySchedule}
          exchangeDate={exchangeDate}
          sendExchangeRequest={this.sendExchangeRequest}
        />
      )
    }
    else if (this.state.body === "Admin") {
        body = (
            <Setfirebase
                recipes = {this.state.recipes}
                users = {this.state.users}
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
            currentUser={this.state.currentUser}
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
        <div className={`App ${this.state.modal? "modal" : ""}`}>
          <Header
              toggleMenu={this.toggleMenu}
              title={this.state.body}
              users={users}
              toggleLogin={this.toggleLogin}
              toggleAlarm={this.toggleAlarm}
              currentUser={currentUser}
          />

          {this.state.modal? 
            <Modal 
              modalButtonClick={this.modalButtonClick}
            /> 
            : body}

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
              <Alarm
                user={currentUser}
                setCurrentUser={this.setCurrentUser}
                acceptRequest={this.acceptRequest}
                declineRequest={this.declineRequest}
                exchangeRequests={exchangeRequests}
              />
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
const dutySchedule = () => {
    let schedules= [];
    for(let i=0;i<14;i++){
        let date = new Date();
        date.setDate(date.getDate() + i);
        let schedule;
        if(i < 7) {
            schedule = {
                date: date,
                senior: users[i * 3],
                junior1: users[i * 3 + 1],
                junior2: users[i * 3 + 2]
            };
        }else{
            const j = i-7;
            schedule = {
                date: date,
                senior: users[j * 3],
                junior1: users[j * 3 + 1],
                junior2: users[j * 3 + 2]
            };
        }
        schedules.push(schedule);
    }
    return schedules;
};
export default App;
