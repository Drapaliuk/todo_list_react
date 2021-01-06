import React, { useState } from 'react'

import { BiPencil } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegSave } from 'react-icons/fa';
import { Calendar } from '../../../todolist/components/todo_full_info/components/calendar/Calendar';

                


export function BirthDayItem({initialDate, placeholder}) {
    const [selectedDate, selectDate] = useState(Date.now());
    const [isCorrection, setCorrection] = React.useState(false);

 
    const correctionHandler = () => setCorrection(!isCorrection)
    const dateChangeHandler = date => {
        selectDate(date)
    }
 
    const CustomInput = ({value, onClick}) => {
        return <input  value = {value} 
                    class="settings__change-value-input" 
                    type="text" 
                    placeholder={placeholder} 
                    onClick = {onClick}
        />
    }

    return (
        <li class="settings__value-list-item">
            <div class="settings__value">
                <span class="settings__value-header">Birthday:</span> <span
                    class="settings__changable-field">{selectedDate}</span>
                <button onClick = {correctionHandler} class="settings__change-value-btn">
                    {
                        isCorrection 
                        ?
                        <AiOutlineClose className="settings__icon_correct" />
                        :
                        <BiPencil className="settings__icon_correct" />
                    }
                </button>
            </div>
            
           {
            isCorrection 
                &&
            <div className = 'settings__change-value-wrapper'>
                <Calendar />
                {
                    <button className="settings__save-btn">
                        <FaRegSave className="settings__save-icon" />
                    </button>
                }
               
            </div>
           }
        </li>

        
    )
}


