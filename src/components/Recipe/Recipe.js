import React, { Component } from "react";
import Task from "./Task";
import Ingredients from "./Ingredients";
class Recipe extends Component {

    render() {
        const { recipe, onClick } = this.props;
        const mapTask = (task,index) => {
            return (
                <Task task = {task} index = {index} key ={index}/>
            );
        };
        const tasks = recipe.tasks.map(mapTask);

        return (
            <div style={styles.boxS}>
                <div style={{cursor:"default", marginBottom:15}} className="todaymenu-recipe-wrapper">
                    <a target="_blank" href={recipe.video}><img style={{margin:0}} className="todaymenu-image" src={recipe.image} alt={recipe.name}  /></a>
                    <div style = {styles.overlay}>
                        <div >{recipe.name}</div>
                        <i style={styles.icon} className="fa fa-reply"
                        onClick={onClick}/>
                    </div>
                </div>
                <div style={styles.header}>
                    <div>Expected Time</div>
                    <div style={{marginLeft:"auto"}}>
                        <i style={{marginRight:5}} className="fa fa-clock-o"/>
                        {recipe.time}</div>
                </div>
                <Ingredients
                    ingredients = {recipe.ingredients}
                    headerS = {styles.header}
                    iconS = {styles.icon}
                />
                <div style={{...styles.header,display:"block", marginTop:10}}>
                    Tasks
                    {tasks}
                </div>
            </div>
        );
    }
}
const styles = {
    boxS:{
        width: 344,
        display: "flex",
        flexDirection: "column",
        margin: "10px 8px",
        background: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        padding:"12px"
    },

    overlay:{
        paddingTop:16,
        paddingLeft: 16,
        cursor:"default",
        display:"flex",
        fontSize: 24,
        height: 70,
        width: 320,
        position:"relative",
        top:"-70px",
        transition: ".3s ease",
        background: "rgba(0,0,0,0.5)",
        color:"white",
        fontWeight: 400,


    },
    header: {
        fontWeight: 800,
        fontSize: 20,
        display:"flex",
        marginBottom:5
    },
    icon:{marginLeft:"auto",padding:"8px 10px 0px 0px", cursor:"pointer"},

};
export default Recipe;
