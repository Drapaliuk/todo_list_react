import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
export const RangeCalendar = ({onSave, placeholder, initialDate}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  React.useEffect(() => {
        setStartDate(initialDate.start)
        setEndDate(initialDate.end)
    }, [initialDate])

  const dateChangeHandler = dates => {
    const [start, end] = dates;
    console.log('dates', dates)
    setStartDate(start)
    setEndDate(end)
    onSave({start: start?.getTime(), end: end?.getTime()})
  }

  const CustomInput = ({value, onClick}) => {
    return <input value = {value} onClick = {onClick} class="todo-due-date__input todo-remind__input" placeholder={placeholder} />
  }

  return (
    <DatePicker 
                customInput = {<CustomInput />}
                shouldCloseOnSelect={false} 
                selected={startDate} 
                startDate = {startDate}
                endDate={endDate}
                onChange={dateChangeHandler} 
                // dateFormat ="MM/dd/yyyy h:mm"
                // dateFormat ="MM/dd/yyyy"
                timeFormat = "HH"
                selectsRange
                />
                
  );
};


// const [startDate, setStartDate] = useState(new Date());
// const [endDate, setEndDate] = useState(null);
// const onChange = dates => {
//   const [start, end] = dates;
//   setStartDate(start);
//   setEndDate(end);
// };
// return (
//   <DatePicker
//     selected={startDate}
//     onChange={onChange}
//     startDate={startDate}
//     endDate={endDate}
//     selectsRange
    
//   />
// );
// };