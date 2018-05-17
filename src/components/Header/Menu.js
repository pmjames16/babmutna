import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  render() {
    const { user } = this.props;
    let name;
    if (user.id === -1) name = "Babmutna";
    else name = user.name;
    return (
      <div className="menu">
        <i
          className="fas fa-times menu-cancel-button"
          onClick={this.props.toggleMenu}
        />
        <ul className="menu-list">
          <li className="menu-user-name">
            <a className="menu-link">
              {name}
            </a>
          </li>
          <li>
            <a
              className="menu-link"
              onClick={() => this.props.changeScreen("Home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="menu-link"
              onClick={() => this.props.changeScreen("Calendar")}
            >
              Calendar
            </a>
          </li>
          <li>
            <a
              className="menu-link"
              onClick={() => this.props.changeScreen("RecipeTemplate")}
            >
              Recipe
            </a>
          </li>
            {/*{<li>*/}
                {/*<a*/}
                    {/*className="menu-link"*/}
                    {/*onClick={() => this.props.changeScreen("Admin")}*/}
                {/*>*/}
                    {/*Admin*/}
                {/*</a>*/}
            {/*</li>}*/}
        </ul>
      </div>
    );
  }
}

export default Menu;
