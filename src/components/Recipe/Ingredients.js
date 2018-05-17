import React, { Component } from "react";
import Ingredient from"./Ingredient";
class Ingredients extends Component {
    render() {
        const { ingredients } = this.props;
        const mapIngredient = (ingredient,index) => {
            return <Ingredient ingredient={ingredient} key={index}/>
        };
        const view = ingredients.map(mapIngredient);
        return (
            <div>{view}</div>
        );
    }
}

export default Ingredients;
