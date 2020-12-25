import React from 'react'

export function DefaultAppLabels() {
    return (
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_without_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-calendar_color"></use>
                </svg>
                <span class="todo-list-label__name">Today </span>
                <span class="todo-list-label__task-amount">2</span>
            </div>
            <div class="todo-list-label todo-list-label_without_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-calendar_color"></use>
                </svg>
                <span class="todo-list-label__name">Week </span>
                <span class="todo-list-label__task-amount">2</span>
            </div>
            <div class="todo-list-label todo-list-label_without_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-calendar_color"></use>
                </svg>
                <span class="todo-list-label__name">Important </span>
                <span class="todo-list-label__task-amount">2</span>
            </div>
        </li>
    )
}