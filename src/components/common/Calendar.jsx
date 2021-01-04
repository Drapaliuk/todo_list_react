import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
export const Calendar = ({placeholder, initialDate, CustomInput, calendarSettings = {}}) => {
  const [selectedDate, selectDate] = useState(null);

  React.useEffect(() => {
      selectDate(initialDate)
    }, [initialDate])
    
  const dateChangeHandler = date => selectDate(date)

//   const CustomInput = ({value, onClick}) => {
//     return <input value = {value} onClick = {onClick} class="todo-due-date__input todo-remind__input" placeholder={placeholder} />
//   }



  const CustomTime = ({ date, value, onChange }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );



  return (
    <DatePicker 
                customInput = {<CustomInput onChange = {() => console.log('change!!')} />}
                shouldCloseOnSelect={false} 
                selected={selectedDate} 
                onChange={dateChangeHandler} 
                showTimeInput
                isClearable
                {...calendarSettings}
                />
                
  );
};

