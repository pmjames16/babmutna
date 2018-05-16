import React, { Component } from "react";
import "./App.css";
import TodayMenu from "./components/TodayMenu/TodayMenu";
import CalendarTemplate from "./components/Calendar/CalendarTemplate";
import RecipeTemplate from "./components/Recipe/RecipeTemplate";
import Header from "./components/Header/Header";
import Menu from "./components/Header/Menu";
import Login from "./components/Header/Login";
import Alarm from "./components/Header/Alarm";
import Trade from "./components/Trade/Trade";
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
            alarm: false
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
        this.setState(({login}) => {
            return {login: !login};
        });
    };

    toggleAlarm = () => {
        this.setState(({alarm}) => {
            return {alarm: !alarm};
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
        } else if (this.state.body === "Admin") {
            body = (
                <Setfirebase
                    recipes={recipes}
                    users={users}
                />
            );
        } else {
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
                    <Trade users={users} currentUser={currentUser}/>
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
export default App;
