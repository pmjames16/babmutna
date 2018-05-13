import React, { Component } from "react";

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isReady:false,
        }
    }
    onClick = ()=>{
        this.setState((prevState)=>{
            return {isReady:!prevState.isReady};
        });
    };

    render() {
        const { ingredient } = this.props;
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
