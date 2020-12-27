import React from 'react'

export function DueTime() {
    return (
        <li class="todo-additional-option__time-options-item">
            <div class="todo-due-date todo-remind">
                <svg class="todo-due-date__icon todo-remind__icon">
                    <use href="./src/img/sprite.svg#icon-calendara_bw"></use>
                </svg>
                <input class="todo-due-date__input todo-remind__input" placeholder="Встановити термін" />

                <button class="delete-btn delete-btn_todo_time_option">
                    <svg class="delete-btn__icon">
                        <use href="./src/img/sprite.svg#icon-cancel"></use>
                    </svg>
                </button>
            </div>
        </li>
    )
}

