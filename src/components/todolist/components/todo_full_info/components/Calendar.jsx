import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
export const Calendar = ({selectsRange, onSave, placeholder, initialDate}) => {
  const [startDate, setStartDate] = useState(initialDate);

  const dateChangeHandler = date => {
    onSave(date.getTime())
    setStartDate(date)
  }

  const CustomInput = ({value, onClick}) => {
    return <input value = {value} onClick = {onClick} class="todo-due-date__input todo-remind__input" placeholder={placeholder} />
  }

  const CustomTime = ({ date, value, onChange }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );



  return (
    <DatePicker 
                customInput = {<CustomInput />}
                shouldCloseOnSelect={false} 
                selected={startDate} 
                onChange={dateChangeHandler} 
                // dateFormat ="MM/dd/yyyy h:mm"
                // dateFormat ="MM/dd/yyyy"
                timeFormat = "HH"
                showTimeInput
                />
                
  );
};