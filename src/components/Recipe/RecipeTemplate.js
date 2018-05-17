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
          headerS = {styles.headerS}
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
      view = <Recipe
          recipe={recipe}
          id={index}
          onClick={wholeRecipe}
          headerS = {styles.headerS}/>;
    }

    return (
      <div style={{ width: "100%" }}>
        <div className="marginer" />
        {view}
      </div>
    );
  }
}

const styles = {
    headerS: {
        width: "344px",
        cursor: "pointer",
        height: "60px",
        background: "#555555",
        position: "relative",
        margin: "10px 8px 10px 8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        color: "white",
        fontWeight: 400,
        paddingLeft: 16,
        paddingTop: 10,
        fontSize: 24,
        display:"flex"
    },
};

export default RecipeTemplate;
