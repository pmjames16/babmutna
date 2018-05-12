import React, { Component } from "react";
import "./CalendarTemplate.css";
import Calendar from './Calendar'

class CalendarTemplate extends Component {

    calendarMapping = () => {
        const { users, recipes, selectRecipeOtherMenu } = this.props;
        const currentDate = new Date();
        let weeks = [];
        for(let i = 0;i<7;i++){
            let day = new Date();
            day.setDate(currentDate.getDate()+i);
            weeks.push(day);
        }
        const calendar_list = weeks.map((day,index)=>{
            let dayUser = users.slice(((index*3)%users.length),((index*3)%users.length+3));
            let count = 0;
            while(dayUser.length < 3){
                dayUser.push(users[count]);
                count++;
            };
            return (
                <Calendar
                    date={day}
                    recipe={recipes[index%(recipes.length)]}
                    users={dayUser}
                    key={index}
                    recipeIndex = {index%(recipes.length)}
                    selectRecipeOtherMenu = {selectRecipeOtherMenu}
                />
            );
        });
        return calendar_list;
    };

    render() {
        return (
            <div className="calendar-template">
                {this.calendarMapping()}
            </div>
        );
    }
}

export default CalendarTemplate;

