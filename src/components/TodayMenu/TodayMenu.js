import React, { Component } from "react";
import "./TodayMenu.css";

class TodayMenu extends Component {
    state = {
        day: "Monday",
    };

    render() {
        const { day } = this.state;
        const { dinner_ready, onClickReady, recipe, selectRecipeOtherMenu, todayUsers, index } = this.props;
        let senior = [],junior=[];
        junior = todayUsers.filter((user)=>{
            return user.skill === 'junior';
        });
        senior = todayUsers.filter((user)=>{
            return user.skill === 'senior';
        });
        const date = new Date();
        const month = date.getMonth()+1;
        const days = date.getDate();

        return (
            <div className="todaymenu-wrapper">
                <div className="todaymenu-title-wrapper">
                    <div className="todaymenu-title">Today's Menu</div>
                    <div className="todaymenu-date">{month}/{days}</div>
                </div>
                <div className="todaymenu-recipe-wrapper">
                    <img onClick={()=>selectRecipeOtherMenu(index)} className="todaymenu-image" src={recipe.image} alt={recipe.name} />
                    <div
                        onClick={onClickReady}
                        className={`todaymenu-dinner-${dinner_ready} dinner-ready`}
                    >
                        {dinner_ready === "yes" ? "Dinner's Ready" : "Cooking Dinner"}
                    </div>
                    <div className="todaymenu-overlay">
                        <div className="todaymenu-recipe">{recipe.name}</div>
                        <div className="todaymenu-day">{day}</div>
                    </div>
                </div>
                <div className="todaymenu-users-wrapper">
                    <div className="todaymenu-user-title">Senior Chef</div>
                    <div className="todaymenu-user-wrapper-wrapper">
                        {senior.map(user => (
                            <div className="todaymenu-user-wrapper" key={user.name}>
                                <img
                                    className="todaymenu-user-image"
                                    src={user.image}
                                    alt={user.name}
                                />
                                <div className="todaymenu-user-name">{user.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="todaymenu-users-wrapper">
                    <div className="todaymenu-user-title">Junior Chef</div>
                    <div className="todaymenu-user-wrapper-wrapper">
                        {junior.map(user => (
                            <div className="todaymenu-user-wrapper" key={user.name}>
                                <img
                                    className="todaymenu-user-image"
                                    src={user.image}
                                    alt={user.name}
                                />
                                <div className="todaymenu-user-name">{user.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodayMenu;
