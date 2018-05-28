import React, { Component } from "react";
import * as firebase from "firebase";

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady:false,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        return {isReady:nextProps.done};
    }

    onClick = ()=>{
        const {recipeIndex, recipeId, changeTask, task, index} = this.props;
        let newTask ={};
        newTask['task']= task;
        newTask['done'] = !this.state.isReady;
        changeTask(recipeIndex,newTask,index);
        const database = firebase.database();
        let updates = {};
        updates['/recipes_/' + recipeId+"/tasks/"+index] =newTask;
        database.ref().update(updates);
    };

    render() {
        const {task, index} = this.props;
        const readyStyle = this.state.isReady ? {color:"gray", opacity:0.8}:{};
        const indexIcon = this.state.isReady ?
            (<i style={styles.checkIcon} className={"fa fa-check-circle"}/>) : (<span>{index+1}</span>);
        return (
            <div onClick={this.onClick} style={{margin:"10px 0px 20px 0px"}} key={index}>
                <li style={styles.taskBox}>
                    <div style={styles.index}>{indexIcon}</div>
                    <div style={readyStyle}>
                        {task.task}
                    </div>
                </li>
                <img style={{margin:"0px"}} className="todaymenu-image" src={task.image} alt={"Task"+index} />
            </div>
        );
    }
}
const styles = {
    taskBox:{
        fontWeight:400,
        fontSize:16,
        fontFamily:"Helvetica, Arial, Sans-serif",
        display:"flex",
        lineHeight:"1.6",
        marginBottom:10
    },
    index:{
        minWidth:30,
        height:30,
        fontSize:"24px",
        fontWeight:400,
        textAlign:"center",
        lineHeight:"1.2",
        border:"1px solid black",
        borderRadius:100,
        marginRight:10,
        marginTop:5,
    },
    checkIcon:{
        color:"#f59f00",
        fontSize:38,
        marginTop:-4,
        marginLeft:-2,
    }
};
export default Task;
