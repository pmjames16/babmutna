import React, { Component } from "react";

class Login extends Component {
    render() {
        const { users } =this.props;
        const maptoLogin = (user) =>{
            return (<div className="col" style={styles.loginName} onClick={()=>this.props.setCurrentUser(user.id)}> {user.name} </div>);
        };
        const view = users.map(maptoLogin);
        return(
            <div className="container" style={styles.loginWrapper}><div className="row">{view}</div></div>
        );
    }
}

const styles = {
    loginWrapper: {
        position:"fixed",
        width:100,
        top:54,
        right:"calc(50% - 180px)",
        backgroundColor:"white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        fontFamily: "Roboto",
        textAlign:"right"
    },
    loginName:{
        fontWeight:400,
        fontSize:16,
        marginRight:10,
        cursor:"pointer"
    }
};
export default Login;
