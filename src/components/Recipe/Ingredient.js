import React, { Component } from "react";
import * as firebase from "firebase";

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isReady:this.props.ingredient.done,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {isReady:nextProps.ingredient.done}
    }

    onClick = ()=>{
        const {recipeIndex, recipeId,changeIngredient, ingredient, id} = this.props;
        let newIngredient = {...ingredient};
        newIngredient['done'] = !this.state.isReady;
        changeIngredient(recipeIndex,newIngredient,id);
        const database = firebase.database();
        let updates = {};
        updates['/recipes_/' + recipeId+"/ingredients/"+id] =newIngredient;
        database.ref().update(updates);
    };

    render() {
        const ingredient = this.props.ingredient.ingredient;
        const readyStyle = this.state.isReady ? { "color":"gray"}:{};
        return (
            <div>
            <span  onClick={this.onClick} style={{cursor:"pointer"}}>
                <i style={{color:"#f59f00", fontSize:16}} className={this.state.isReady ? "fa fa-check-square":"fa fa-square"}/>
                <span style={{...styles.text,...readyStyle }}>{ingredient}</span>
            </span>
            </div>
        );
    }
}
const styles = {
    text:{
        fontWeight:400,
        fontSize:16,
        fontFamily:"Helvetica, Arial, Sans-serif",
        lineHeight:"2.5",
        marginBottom:10,
        marginLeft:5
    },
};
export default Ingredient;
