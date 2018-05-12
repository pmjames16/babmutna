import React, {Component} from "react";
import RecipeHeader from "./RecipeHeader";
import Recipe from "./Recipe";

class RecipeTemplate extends Component {
    constructor(props) {
        super(props);
        this.selectRecipe = this.selectRecipe.bind(this);
        this.wholeRecipe = this.wholeRecipe.bind(this);
        this.state = {
            state: 0,
            recipeId: -1,
        }
    }

    selectRecipe = (key) => {
        this.setState({
            state: 1,
            recipeId: key
        });
    };

    wholeRecipe = () => {
        this.setState({
            state: 0,
            recipeId: -1
        });
    };

    render() {
        const {recipes} = this.props;
        const mapHeader = (recipe, index) => {
            return (<RecipeHeader
                name={recipe.name}
                key={index}
                id={index}
                onClick={this.selectRecipe}
            />);
        };
        let view;
        if(this.state.state === 0){
            view = recipes.map(mapHeader);
        }else{
            const index = this.state.recipeId;
            const recipe = recipes[index];
            view = (<Recipe
                recipe = {recipe}
                id = {index}
                onClick = {this.wholeRecipe}
            />)
        }

        return (
            <div style={{width: "100%"}}>
                {view}
            </div>
        );
    }
}

export default RecipeTemplate;
