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
                // dateFormat ="MM/dd/yyyy h:mm"
                // dateFormat ="MM/dd/yyyy"
                // onCalendarClose = {calendarCloseHandler}
                timeFormat = "HH"
                showTimeInput
                isClearable
                />
                
  );
};

