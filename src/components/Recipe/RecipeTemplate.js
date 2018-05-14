import React, { Component } from "react";
import RecipeHeader from "./RecipeHeader";
import Recipe from "./Recipe";
import "./RecipeTemplate.css";

class RecipeTemplate extends Component {
  render() {
    const {
      recipes,
      recipeState,
      recipeId,
      selectRecipe,
      wholeRecipe
    } = this.props;
    const mapHeader = (recipe, index) => {
      return (
        <RecipeHeader
          name={recipe.name}
          key={index}
          id={index}
          onClick={selectRecipe}
        />
      );
    };
    let view;
    if (recipeState === 0) {
      view = recipes.map(mapHeader);
    } else {
      const index = recipeId;
      const recipe = recipes[index];
      view = <Recipe recipe={recipe} id={index} onClick={wholeRecipe} />;
    }

    return (
      <div style={{ width: "100%" }}>
        <div className="marginer" />
        {view}
      </div>
    );
  }
}

export default RecipeTemplate;
