import React, { Component } from "react";

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {task, index} = this.props;
        return (
            <div style={{margin:"10px 0px 20px 0px"}} key={index}>
                <li style={styles.taskBox}>
                    <div style={{minWidth:30,fontSize:"24px",fontWeight:700,lineHeight:"1.3"}}>{index+1}</div>
                    <div>
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
    }
};
export default Task;
