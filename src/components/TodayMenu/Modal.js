import React, { Component } from "react";

class Modal extends Component {
    render() {
        return(
            <div style={styles.modal} >
              <div style={styles.logout}>Are you sure?</div>
              <button className="button" style={styles.button} onClick={() => this.props.modalButtonClick(true)}>Yes</button>
              <button className="button" style={styles.button} onClick={() => this.props.modalButtonClick(false)}>No</button>
            </div>
        );
    }
}

const styles = {
    modal: {
        position:"fixed",
        width:240,
        top:200,
        hegiht: 100,
        left: "calc(50% - 120)",
        backgroundColor:"white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        fontFamily: "Roboto",
        textAlign:"center",
        paddingTop: 20,
        paddingBottom: 10,
    },
    logout:{
      fontWeight:400,
      fontSize:20,
    },
    button: {
      marginTop: 20,
      backgroundColor: "white",
      border: "none",
      color: "#f59f00",
      boxShadow: "none",
      outline: "none",
      marginLeft: 10,
      fontSize: 18,
    },
};
export default Modal;
