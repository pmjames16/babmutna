import React, { Component } from "react";

class RecipeHeader extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = key => {
    this.props.onClick(key);
  };

  render() {
    const { name, id, headerS } = this.props;
    return (
      <div style={headerS} onClick={() => this.onClick(id)}>
        <span>{name}</span>
      </div>
    );
  }
}

export default RecipeHeader;
