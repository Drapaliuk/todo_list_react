import React from 'react'
import { Calendar } from './Calendar'



export function TaskDateOption({onSave, placeholder, Icon, initialDate = '', selectsRange}) {
    
    const CustomInput = <input class="todo-due-date__input todo-remind__input" placeholder="Встановити термін" />

    return (
        <li class="todo-additional-option__time-options-item">
            <div class="todo-due-date todo-remind">
                <Icon className = 'todo-due-date__icon todo-remind__icon' />
                <Calendar placeholder = {placeholder} 
                          onSave = {onSave} 
                          customInput = {CustomInput} 
                          initialDate = {initialDate}
                          selectsRange = {selectsRange} 
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

