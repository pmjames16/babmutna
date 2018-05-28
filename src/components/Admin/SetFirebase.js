import React, { Component } from "react";
import * as firebase from "firebase";


class SetFirebase extends Component {
    onClick = () =>{
        // const { users, recipes } = this.props;
        // const database = firebase.database();
        // console.log("On Click the button");
        // //User upload
        // recipes.map((recipe_)=>{
        //     let newPostKey = database.ref().child('recipes_').push().key;
        //     let updates = {};
        //     let recipe = recipe_;
        //     let ingredients = recipe.ingredients.map((ingredient)=>{
        //         return {ingredient:ingredient , done:false}
        //     });
        //     let tasks = recipe.tasks.map((task)=>{
        //         return {task:task , done:false}
        //     });
        //     // let ingredients = recipe.ingredients.map((ingredient)=>{
        //     //         return ingredient.ingredient
        //     //     });
        //     // let tasks = recipe.tasks.map((task)=>{
        //     //     return task.task
        //     // });
        //     recipe.tasks = tasks;
        //     recipe.ingredients = ingredients;
        //     recipe['date'] = new Date().getDate();
        //     updates['/recipes_/' + newPostKey] = recipe;
        //     database.ref().update(updates);
        // });
    };
    render() {
        const { users, recipes } = this.props;
        const uploadUsers = users.map((user, index)=>{
            return (<div key={index}>{user.name}</div>);
        });
        const uploadRecipe = recipes.map((recipe, index)=>{
            return (<div key={index}>{recipe.name}</div>);
        });
        return(
            <div style = {{marginTop:50}}>
                <button onClick={this.onClick}> Set data in Fire Base</button>
                <div style = {{ display:"flex"}}>
                    <div>
                        <h2 style={{color:"black"}}>Upload Recipes</h2>
                        {uploadRecipe}
                    </div>
                    <div>
                        <h2 style={{color:"black"}}>Upload Users</h2>
                        {uploadUsers}
                    </div>
                </div>
            </div>
        );
    }
}
export default SetFirebase;