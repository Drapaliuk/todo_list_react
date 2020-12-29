import React from 'react'
import { RangeCalendar } from './RangeCalendar'



export function TaskRangeDateOption({onSave, placeholder, Icon, initialDate,}) {
    
    const CustomInput = <input class="todo-due-date__input todo-remind__input" placeholder="Встановити термін" />

    return (
        <li class="todo-additional-option__time-options-item">
            <div class="todo-due-date todo-remind">
                <Icon className = 'todo-due-date__icon todo-remind__icon' />
                <RangeCalendar placeholder = {placeholder} 
                               onSave = {onSave} 
                               customInput = {CustomInput} 
                               initialDate = {initialDate}
                                />
                <button class="delete-btn delete-btn_todo_time_option">
                    <svg class="delete-btn__icon">
                        <use href="./src/img/sprite.svg#icon-cancel"></use>
                    </svg>
                </button>
            </div>
        </li>
    )
}

