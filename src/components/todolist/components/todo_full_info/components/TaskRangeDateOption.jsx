import React from 'react'
import { RangeCalendar } from './RangeCalendar'
import {AiOutlineClose} from 'react-icons/ai'


export function TaskRangeDateOption({onManipulation, placeholder, Icon, initialDate,}) {
    // const CustomInput = <input class="todo-due-date__input todo-remind__input" placeholder={placeholder} />
    const deleteDateHandler = () => onManipulation(null) 

    return (
        <li class="todo-additional-option__time-options-item">
            <div class="todo-due-date todo-remind">
                <Icon className = 'todo-due-date__icon todo-remind__icon' />
                <RangeCalendar placeholder = {placeholder} 
                               onManipulation = {onManipulation} 
                               initialDate = {initialDate}
                                />
                <button onClick = {deleteDateHandler} class="delete-btn delete-btn_todo_time_option">
                    <AiOutlineClose className="delete-btn__icon" />
                </button>
            </div>
        </li>
    )
}

