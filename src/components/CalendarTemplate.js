import React from "react";
import "./CalendarTemplate.css";

const CalendarTemplate = ({ recipe_list, calendar }) => {
  // const calendar_list = recipe_list.map(data => (
  //   <Calendar
  //     day={data.day}
  //     recipe={data.recipe}
  //     users={data.users}
  //     key={data.day}
  //     image={data.image}
  //   />
  // ));

  return <div className="calendar-template">{calendar()}</div>;
};

export default CalendarTemplate;
