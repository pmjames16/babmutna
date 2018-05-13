import React, { Component } from "react";
import "./App.css";
import TodayMenu from "./components/TodayMenu/TodayMenu";
import CalendarTemplate from "./components/Calendar/CalendarTemplate";
import RecipeTemplate from "./components/Recipe/RecipeTemplate";
import Header from "./components/Header/Header";
import Menu from "./components/Header/Menu";
import Login from "./components/Header/Login";
import Alarm from "./components/Header/Alarm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dinner_ready: "no",
            body: "Home",
            menu: false,
            recipeId: -1, //The index of recipe
            recipeState: 0, //0 is whole recipe, 1 is detail, should set RecipeId
            todayRecipe: 0, //The index of recipe
            users: users,
            currentUser:{
                id:-1
            },
            login:false,
            alarm:false,
        };
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
            return { menu: !prevState.menu };
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

    setCurrentUser = (id) => {
        if(id!==-1) {//Login
            const currentUser = users.filter((user) => {
                return user.id === id;
            });
            if(currentUser.length < 1){
                console.warn("No user Select in Login");
                return;
            }
            this.setState({
                currentUser: currentUser[0],
                login:false
            });
            console.log("Login");
        }else{
            this.setState({
                currentUser: {
                    id:-1
                },
                login:false,
                alarm:false,
            });
            console.log("Logout");
        }
    };

    toggleLogin = ()=>{
        this.setState(({login})=>{
            return {login:!login};
        });
    };

    toggleAlarm= ()=>{
        this.setState(({alarm})=>{
            return {alarm:!alarm};
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
            currentUser
        } = this.state;
        const todayUsers = users.slice(0, 3);

        if (this.state.body === "Calendar") {
            body = (
                <CalendarTemplate
                    users={users}
                    recipes={recipes}
                    selectRecipeOtherMenu={this.selectRecipeOtherMenu}
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
        } else {
            body = (
                <TodayMenu
                    recipe={recipes[todayRecipe]}
                    index={todayRecipe}
                    todayUsers={todayUsers}
                    dinner_ready={dinner_ready}
                    selectRecipeOtherMenu={this.selectRecipeOtherMenu}
                    onClickReady={this.handleDinnerReady}
                />
            );
        }

        return (
            <div className="App">
                <Header
                    toggleMenu={this.toggleMenu}
                    title={this.state.body}
                    users = {users}
                    toggleLogin = {this.toggleLogin}
                    toggleAlarm = {this.toggleAlarm}
                    currentUser = {currentUser}/>
                {body}
                {this.state.menu ? (
                    <Menu user = {currentUser} changeScreen={this.changeScreen} toggleMenu={this.toggleMenu} />
                ) : null}

                {this.state.login ? (<Login users = {users} setCurrentUser = {this.setCurrentUser}/>):null}
                {this.state.alarm ? (<Alarm user = {currentUser} setCurrentUser = {this.setCurrentUser}/>):null}
            </div>
        );
    }
}
const recipes = [
    {
        name: "Chicken Curry",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb",
        video: "https://www.youtube.com/watch?v=erHhYyqJq6A",
        time: "2h 30min",
        ingredients: [
            "extra-virgin olive oil",
            "1 medium yellow onion, chopped",
            "2 lb. boneless skinless chicken breasts",
            "3 cloves garlic, minced",
            "1 tbsp. freshly grated ginger",
            "1 tsp. paprika",
            "1 tsp. turmeric",
            "1 tsp. coriander",
            "1/2 tsp. cumin",
            "15-oz. can crushed tomatoes",
            "1/2 c. chicken broth",
            "1/2 c. heavy cream",
            "kosher salt",
            "Freshly ground black pepper",
            "Chopped fresh cilantro, for garnish",
            "Basmati rice, cooked, for serving"
        ],
        tasks: [
            {
                task:
                    "In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
            },
            {
                task:
                    "Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
            },
            {
                task:
                    "Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
            },
            {
                task:
                    "Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
            }
        ]
    },
    {
        name: "Hot Beef Curry",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/hot%20beef.jpg?alt=media&token=9c81aa80-bace-4920-b580-549660af606a",
        video: "https://www.youtube.com/watch?v=SlA4d-UDMmg",
        time: "2h 30min",
        ingredients: [
            "extra-virgin olive oil",
            "1 medium yellow onion, chopped",
            "2 lb. boneless skinless chicken breasts",
            "3 cloves garlic, minced",
            "1 tbsp. freshly grated ginger",
            "1 tsp. paprika",
            "1 tsp. turmeric",
            "1 tsp. coriander",
            "1/2 tsp. cumin",
            "15-oz. can crushed tomatoes",
            "1/2 c. chicken broth",
            "1/2 c. heavy cream",
            "kosher salt",
            "Freshly ground black pepper",
            "Chopped fresh cilantro, for garnish",
            "Basmati rice, cooked, for serving"
        ],
        tasks: [
            {
                task:
                    "In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
            },
            {
                task:
                    "Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
            },
            {
                task:
                    "Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
            },
            {
                task:
                    "Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
            }
        ]
    },
    {
        name: "Potato Curry",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/potato.jpg?alt=media&token=5a06cb37-f74d-47c7-b550-268402b02868",
        video: "https://www.youtube.com/watch?v=E2cKLMBLloM",
        time: "2h 30min",
        ingredients: [
            "extra-virgin olive oil",
            "1 medium yellow onion, chopped",
            "2 lb. boneless skinless chicken breasts",
            "3 cloves garlic, minced",
            "1 tbsp. freshly grated ginger",
            "1 tsp. paprika",
            "1 tsp. turmeric",
            "1 tsp. coriander",
            "1/2 tsp. cumin",
            "15-oz. can crushed tomatoes",
            "1/2 c. chicken broth",
            "1/2 c. heavy cream",
            "kosher salt",
            "Freshly ground black pepper",
            "Chopped fresh cilantro, for garnish",
            "Basmati rice, cooked, for serving"
        ],
        tasks: [
            {
                task:
                    "In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
            },
            {
                task:
                    "Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
            },
            {
                task:
                    "Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
            },
            {
                task:
                    "Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
            }
        ]
    },
    {
        name: "Beef Curry",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/beef%20curry.jpg?alt=media&token=a77281c5-f626-484b-9238-20e836b72017",
        video: "https://www.youtube.com/watch?v=boVnoWfESKo",
        time: "2h 30min",
        ingredients: [
            "extra-virgin olive oil",
            "1 medium yellow onion, chopped",
            "2 lb. boneless skinless chicken breasts",
            "3 cloves garlic, minced",
            "1 tbsp. freshly grated ginger",
            "1 tsp. paprika",
            "1 tsp. turmeric",
            "1 tsp. coriander",
            "1/2 tsp. cumin",
            "15-oz. can crushed tomatoes",
            "1/2 c. chicken broth",
            "1/2 c. heavy cream",
            "kosher salt",
            "Freshly ground black pepper",
            "Chopped fresh cilantro, for garnish",
            "Basmati rice, cooked, for serving"
        ],
        tasks: [
            {
                task:
                    "In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
            },
            {
                task:
                    "Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
            },
            {
                task:
                    "Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
            },
            {
                task:
                    "Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
                image:
                    "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
            }
        ]
    },{
        name: "Indian Butter Chicken",
        image: "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/butterChicken.jpg?alt=media&token=67b1aa8d-536e-4a82-aad4-9fafdf115b7a",
        video: "https://www.youtube.com/watch?v=a03U45jFxOI",
        time: "2h 0min",
        ingredients: [
            "1 tablespoon peanut oil","1 shallot, finely chopped","1/4 white onion, chopped","2 tablespoons butter","2 teaspoons lemon juice","1 tablespoon ginger garlic paste","1 teaspoon garam masala","1 teaspoon chili powder","1 teaspoon ground cumin","1 bay leaf"
        ],
        tasks: [
            {
                task: "Heat 1 tablespoon oil in a large saucepan over medium high heat. Saute shallot and onion until soft and translucent. Stir in butter, lemon juice, ginger-garlic paste, 1 teaspoon garam masala, chili powder, cumin and bay leaf. Cook, stirring, for 1 minute. Add tomato sauce, and cook for 2 minutes, stirring frequently. Stir in half-and-half and yogurt. Reduce heat to low, and simmer for 10 minutes, stirring frequently. Season with salt pepper. Remove from heat and set aside.",
                image: "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/taskbutter.jpg?alt=media&token=b6433b0a-dbf4-488f-b735-378e99e591a3"
            },
            {
                task:
                    "Heat 1 tablespoon oil in a large heavy skillet over medium heat. Cook chicken until lightly browned, about 10 minutes. Reduce heat, and season with 1 teaspoon garam masala and cayenne. Stir in a few spoonfuls of sauce, and simmer until liquid has reduced, and chicken is no longer pink. Stir cooked chicken into sauce.",
                image: "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/taskbutter2.jpg?alt=media&token=b21eb8b9-d94f-4758-8cc9-f3eeb5d29b99"
            },
            {
                task: "Mix together cornstarch and water, then stir into the sauce. Cook for 5 to 10 minutes, or until thickened.",
                image: "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/butterChicken.jpg?alt=media&token=67b1aa8d-536e-4a82-aad4-9fafdf115b7a"
            },
        ]
    },
];
const users = [
    {
        name: "Arif Hadii",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait1.jpg?alt=media&token=ca4a4b01-493e-4a4a-a8ea-a750832a94cc",
        skill: "senior",
        id:0
    },
    {
        name: "Davidee",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait2.jpg?alt=media&token=6d444da9-d56d-4437-a665-bc5552d38d2d",
        skill: "junior",
        id:1
    },
    {
        name: "Etranger",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait4.jpg?alt=media&token=155b7575-d3dc-4c59-8b5d-39bbd3c1ad77",
        skill: "junior",
        id:2
    },
    {
        name: "James",
        image:
            "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg",
        skill: "senior",
        id:3
    },
    {
        name: "Sabagi",
        image:
            "https://i.pinimg.com/736x/b9/22/92/b92292fad977b7537b0912f3a725add4--human-faces-north-western.jpg",
        skill: "junior",
        id:4
    },
    {
        name: "Jungho",
        image:
            "https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/portrait3.jpg?alt=media&token=3817a915-a0c4-4147-80fe-5937df8dcfe8",
        skill: "junior",
        id:5
    }
];
export default App;
