import React, { Component } from "react";

class Alarm extends Component {
    render() {
        return(
            <div onClick={()=>this.props.setCurrentUser(-1)} style={styles.alarmWrapper} ><span style={styles.logout}>Logout</span></div>
        );
    }
}

const styles = {
    alarmWrapper: {
        position:"fixed",
        width:100,
        top:54,
        right:"calc(50% - 180px)",
        backgroundColor:"white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        fontFamily: "Roboto",
        textAlign:"right"
    },
    logout:{
        fontWeight:400,
        fontSize:16,
        marginRight:10,
        cursor:"pointer"
    }
};
export default Alarm;
