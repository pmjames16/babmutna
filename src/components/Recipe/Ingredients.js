import React, { Component } from "react";
import Ingredient from"./Ingredient";
class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isOpened:false,
        }
    }
    onClick = ()=>{
        this.setState((prevState)=>{
            return {isOpened:!prevState.isOpened};
        });
    };

    render() {
        const { ingredients, headerS, iconS } = this.props;
        const mapIngredient = (ingredient,index) => {
            return <Ingredient ingredient={ingredient} key={index}/>
        };
        const view = this.state.isOpened ? ingredients.map(mapIngredient):null;
        return (
            <div>
                <div style={styles.header}>
                    <div onClick={this.onClick} style={headerS}>Ingredient</div>
                    <i style={{...iconS,fontSize:20}} onClick={this.onClick} className={this.state.isOpened ? "fa fa-caret-up":"fa fa-caret-down"}/>
                </div>
                <div>{view}</div>
            </div>
        );
    }
}
const styles = {
    header:{
        display:"flex",
        marginTop:10
    },
};
export default Ingredients;
