import React from 'react'
import { MobileEditListLabel } from '../mobile_edit_list_label/MobileEditListLabel'

export function TasksLitsLabel() {
    return (
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_with_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-clipboard"></use>
                </svg>
                <span class="todo-list-label__name">Warnings </span>
                <span class="todo-list-label__task-amount">3</span>
                <button class="todo-list-label__correct-btn">
                    <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg>
                </button>
            </div>
            {/* <MobileEditListLabel /> */}
        </li>
    )
};