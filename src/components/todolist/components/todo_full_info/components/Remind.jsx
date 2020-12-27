import React from 'react'

export function Reminder() {
    return (
        <li class="todo-additional-option__time-options-item">
            <div class="todo-remind">
                <svg class="todo-remind__icon">
                    <use href="./src/img/sprite.svg#icon-alarm-clock"></use>
                </svg>
                <input class="todo-remind__input" placeholder="Нагадати" />
                <button class="delete-btn delete-btn_todo_time_option">
                    <svg class="delete-btn__icon">
                        <use href="./src/img/sprite.svg#icon-cancel"></use>
                    </svg>
                </button>
            </div>
        </li>
    )
}

