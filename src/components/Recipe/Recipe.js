import React, { Component } from "react";
import Task from "./Task";
import Ingredients from "./Ingredients";
import * as firebase from "firebase";


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state:0,//0 is ingrdients, 1 is task
        }
    }

    componentDidMount(){
        const { recipe, id,recipeIndex } = this.props;

        if(this.props.recipe.date !== (new Date()).getDate()){
            console.log("diff",this.props.recipe.date, (new Date()).getDate());
            const database = firebase.database();
            let updates = {};

            let ingredients = recipe.ingredients.map((ingredient)=>{
                let newIngredient = Object.assign({},ingredient);
                newIngredient['done']=false;
                return newIngredient;
            });
            let tasks = recipe.tasks.map((task)=>{
                let newTask = Object.assign({},task);
                newTask['done']=false;
                return newTask
            });
            if(id) {
                updates['/recipes_/' + id + "/date"] = new Date().getDate();
                updates['/recipes_/' + id + "/tasks"] = tasks;
                updates['/recipes_/' + id + "/ingredients"] = ingredients;
                database.ref().update(updates).then(()=>{
                    const recipeRef = database.ref('/recipes_/'+id);
                    recipeRef.on('value',(snapshot) => {
                        this.props.initRecipeState(recipeIndex, snapshot.val().tasks, snapshot.val().ingredients);
                    })
                });

            }else{
                console.error("What happen");
            }
        }else{
            const recipeRef = firebase.database().ref('/recipes_/'+id);
            recipeRef.on('value',(snapshot) => {
                this.props.initRecipeState(recipeIndex, snapshot.val().tasks, snapshot.val().ingredients);
            })
            // console.log("Same");
        }

    }


    onClick = (state) => {
        this.setState({
           state:state,
        });
    };

    render() {
        const { recipe, onClick, headerS, id, recipeIndex } = this.props;
        const mapTask = (task, index) => {
            return <Task
                task={task.task}
                done = {task.done}
                index={index}
                key={index}
                changeTask = {this.props.changeTask}
                recipeId = {id}
                recipeIndex ={recipeIndex}/>;
        };
        const tasks = recipe.tasks.map(mapTask);

        return (
            <div style={styles.boxS}>
                <div style={{...headerS,width:"100%",margin:0,cursor: "default"}}>
                    <div>{recipe.name}</div>
                    <i style={styles.icon} className="fa fa-reply" onClick={onClick} />
                </div>
                <div
                    style={{ cursor: "default", marginBottom: 15 }}
                    className="todaymenu-recipe-wrapper"
                >
                    <a target="_blank" href={recipe.video}>
                        <img
                            style={{ margin: 0 }}
                            className="todaymenu-image"
                            src={recipe.image}
                            alt={recipe.name}
                        />
                    </a>
                    <i style={styles.video} className="fa fa-video" />

                </div>
                <div style={styles.header}>
                    <div>Expected Time</div>
                    <div style={{ marginLeft: "auto" }}>
                        <i style={{ marginRight: 5 }} className="fa fa-clock-o" />
                        {recipe.time}
                    </div>
                </div>
                <ul style={styles.tabBox} className="nav nav-tabs">
                    <li className={this.state.state === 0 ? "active":""} onClick={()=>this.onClick(0)} style={styles.tab}><a data-toggle="tab" >Ingredients</a></li>
                    <li className={this.state.state === 1 ? "active":""} onClick={()=>this.onClick(1)} style={styles.tab}><a data-toggle="tab">Tasks</a></li>
                </ul>
                <div className="tab-content">
                    <div id="ngredient" className="tab-pane fade in active">
                        <div>
                            <div hidden={this.state.state!==0} >
                                <Ingredients
                                    changeIngredient = {this.props.changeIngredient}
                                    ingredients={recipe.ingredients}
                                    hidden ={this.state.state===1}
                                    recipeId = {id}
                                    recipeIndex ={recipeIndex}
                                />
                            </div>
                            <div hidden={this.state.state!==1}>
                                {tasks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const styles = {
    boxS: {
        width: 344,
        display: "flex",
        flexDirection: "column",
        margin: "54px 8px 10px 8px",
        background: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        padding: "12px"
    },
    header: {
        fontWeight: 600,
        fontSize: 20,
        display: "flex",
        marginBottom: 5
    },
    icon: {
        marginLeft: "auto",
        padding: "8px 10px 0px 0px",
        cursor: "pointer" },
    video: {
        position: "relative",
        fontSize: 40,
        left: 140,
        top: "-120px",
        opacity: 0.8,
        color:"white",
    },
    tab:{
        width:"50%",
        textAlign:"center",
        fontSize:16,
        fontWeight:600
    },
    tabBox:{
        marginTop:20,
        width:"calc(100% + 24px)",
        marginLeft:"-11px"
    },
};
export default Recipe;
