import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
export const Calendar = ({onManipulation, placeholder, initialDate}) => {
  const [selectedDate, selectDate] = useState(null);

  React.useEffect(() => {
      selectDate(initialDate)
    }, [initialDate])
    
  const dateChangeHandler = date => {
    selectDate(date)
    onManipulation(date?.getTime())
  }

  const CustomInput = ({value, onClick}) => {
    return <input value = {value} onClick = {onClick} class="todo-due-date__input todo-remind__input" placeholder={placeholder} />
  }

  return (
    <DatePicker 
                customInput = {<CustomInput />}
                shouldCloseOnSelect={false} 
                selected={selectedDate} 
                onChange={dateChangeHandler} 
                timeFormat = "HH"
                showTimeInput
                isClearable
                />
                
  );
};