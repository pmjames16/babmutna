import React, { Component } from "react";
import "./App.css";
import TodayMenu from "./components/TodayMenu/TodayMenu";
import CalendarTemplate from "./components/Calendar/CalendarTemplate";
import RecipeTemplate from "./components/Recipe/RecipeTemplate";
import About from "./components/About/About";
import Header from "./components/Header/Header";
import Menu from "./components/Header/Menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "RecipeTemplate",
      menu: false
    };
  }

  changeScreen = screen => {
    this.setState({ body: screen, menu: false });
  };

  toggleMenu = () => {
    this.setState(prevState => {
      return { menu: !prevState.menu };
    });
  };

  render() {
    let body = null;
    if (this.state.body === "Calendar") {
      body = <CalendarTemplate />;
    } else if (this.state.body === "RecipeTemplate") {
      body = <RecipeTemplate
        recipes = {recipes}
      />;
    } else if (this.state.body === "About") {
      body = <About />;
    } else {
      body = <TodayMenu />;
    }

    return (
      <div className="App">
        <Header toggleMenu={this.toggleMenu} />
        {body}
        {this.state.menu ? (
          <Menu changeScreen={this.changeScreen} toggleMenu={this.toggleMenu} />
        ) : null}
      </div>
    );
  }
}
const recipes = [{
    name:"Chicken Curry",
    image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb",
    video:"https://www.youtube.com/watch?v=erHhYyqJq6A",
    time:"2h 30min",
    ingredients:["extra-virgin olive oil", "1 medium yellow onion, chopped", "2 lb. boneless skinless chicken breasts", "3 cloves garlic, minced","1 tbsp. freshly grated ginger","1 tsp. paprika", "1 tsp. turmeric","1 tsp. coriander", "1/2 tsp. cumin", "1 15-oz. can crushed tomatoes", "1 1/2 c. chicken broth", "1/2 c. heavy cream", "kosher salt", "Freshly ground black pepper", "Chopped fresh cilantro, for garnish", "Basmati rice, cooked, for serving"],
    tasks:[
        {
            task:"In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
        },
        {
             task:"Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
        },
        {
            task:"Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
        },
        {
            task:"Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
        }
    ],
    },{
    name:"Hot Beef Curry",
    image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/hot%20beef.jpg?alt=media&token=9c81aa80-bace-4920-b580-549660af606a",
    video:"https://www.youtube.com/watch?v=SlA4d-UDMmg",
    time:"2h 30min",
    ingredients:["extra-virgin olive oil", "1 medium yellow onion, chopped", "2 lb. boneless skinless chicken breasts", "3 cloves garlic, minced","1 tbsp. freshly grated ginger","1 tsp. paprika", "1 tsp. turmeric","1 tsp. coriander", "1/2 tsp. cumin", "1 15-oz. can crushed tomatoes", "1 1/2 c. chicken broth", "1/2 c. heavy cream", "kosher salt", "Freshly ground black pepper", "Chopped fresh cilantro, for garnish", "Basmati rice, cooked, for serving"],
    tasks:[
        {
            task:"In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
        },
        {
            task:"Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
        },
        {
            task:"Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
        },
        {
            task:"Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
        }
    ],
}, {
    name:"Potato Curry",
    image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/potato.jpg?alt=media&token=5a06cb37-f74d-47c7-b550-268402b02868",
    video:"https://www.youtube.com/watch?v=E2cKLMBLloM",
    time:"2h 30min",
    ingredients:["extra-virgin olive oil", "1 medium yellow onion, chopped", "2 lb. boneless skinless chicken breasts", "3 cloves garlic, minced","1 tbsp. freshly grated ginger","1 tsp. paprika", "1 tsp. turmeric","1 tsp. coriander", "1/2 tsp. cumin", "1 15-oz. can crushed tomatoes", "1 1/2 c. chicken broth", "1/2 c. heavy cream", "kosher salt", "Freshly ground black pepper", "Chopped fresh cilantro, for garnish", "Basmati rice, cooked, for serving"],
    tasks:[
        {
            task:"In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
        },
        {
            task:"Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
        },
        {
            task:"Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
        },
        {
            task:"Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
        }
    ],},
{
    name:"Beef Curry",
    image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/beef%20curry.jpg?alt=media&token=a77281c5-f626-484b-9238-20e836b72017",
    video:"https://www.youtube.com/watch?v=boVnoWfESKo",
    time:"2h 30min",
    ingredients:["extra-virgin olive oil", "1 medium yellow onion, chopped", "2 lb. boneless skinless chicken breasts", "3 cloves garlic, minced","1 tbsp. freshly grated ginger","1 tsp. paprika", "1 tsp. turmeric","1 tsp. coriander", "1/2 tsp. cumin", "1 15-oz. can crushed tomatoes", "1 1/2 c. chicken broth", "1/2 c. heavy cream", "kosher salt", "Freshly ground black pepper", "Chopped fresh cilantro, for garnish", "Basmati rice, cooked, for serving"],
    tasks:[
        {
            task:"In a large pot over medium-high heat, heat oil. Add onion and cook until softened and lightly golden, 5 to 7 minutes. Add chicken and sear until golden on all sides, 5 minutes more. Stir in garlic and ginger and cook until fragrant, 2 minutes more.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task1.jpg?alt=media&token=0502b373-a937-4a10-af73-d879a5426418"
        },
        {
            task:"Coat aromatics in spices and cook until very fragrant, less than a minute more. Pour in tomatoes and chicken broth and bring to a simmer.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task2.jpg?alt=media&token=b7e467e5-7525-45fd-a7a6-8477ca4c615c"
        },
        {
            task:"Stir in heavy cream, then season with salt and pepper. Simmer until chicken pieces are cooked through and tender, about 10 minutes.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/task3.jpg?alt=media&token=deab4659-0268-478a-897c-254d8188b380"
        },
        {
            task:"Garnish with cilantro and serve over rice or with naan, with lemon wedges for squeezing.",
            image:"https://firebasestorage.googleapis.com/v0/b/babmutna-536bf.appspot.com/o/chicken%20curry.jpg?alt=media&token=e9180a59-4f75-4db2-9ebd-9540f97fc5cb"
        }
    ]}];

export default App;
