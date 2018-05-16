import React, { Component } from "react";
import Task from "./Task";
import Ingredients from "./Ingredients";
class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state:0,//0 is ingrdients, 1 is task
        }
    }
    onClick = (state) => {
        this.setState({
           state:state,
        });
    };

    render() {
        const { recipe, onClick, headerS } = this.props;
        const mapTask = (task, index) => {
            return <Task task={task} index={index} key={index} />;
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
                                    ingredients={recipe.ingredients}
                                    hidden ={this.state.state===1}
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
