import React, { Component } from "react";

class RecipeHeader extends Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick = (key) => {
        this.props.onClick(key);
    }
    render() {
        const { name , id } = this.props;
        return (
            <div style={styles.boxS} onClick = { ()=>this.onClick(id) }>
                <span style={styles.nameS}>{name}</span>
            </div>
        );
    }
}
const styles = {
    boxS:{
        width: "344px",
        cursor: "pointer",
        height:"60px",
        background:"#555555",
        display: "flex",
        flexDirection: "column",
        margin:"10px 8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        color: "white",
        fontWeight: 400,
        paddingLeft: 16,
        paddingTop: 10
    },
    nameS:{
        fontSize: 24
    }
};
export default RecipeHeader;
