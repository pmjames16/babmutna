import React, { Component } from "react";
import Ingredient from"./Ingredient";
class Ingredients extends Component {
    render() {
        const { ingredients, recipeIndex } = this.props;
        const mapIngredient = (ingredient,index) => {
            return <Ingredient
                ingredient={ingredient}
                key={index}
                id={index}
                changeIngredient = {this.props.changeIngredient}
                recipeId = {this.props.recipeId}
                recipeIndex = {recipeIndex}/>
        };
        const view = ingredients.map(mapIngredient);
        return (
            <div>{view}</div>
        );
    }
}

export default Ingredients;
