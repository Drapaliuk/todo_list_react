import React from 'react'
import { MobileEditListLabel } from '../mobile_edit_list_label/MobileEditListLabel'
import { FaClipboardList } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';

export function TasksLitsLabel(props) {
    return (
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_with_correct_btn">
                <FaClipboardList className = 'todo-list-label__icon' />
                <span class="todo-list-label__name">Warnings </span>
                <span class="todo-list-label__task-amount">3</span>
                <button class="todo-list-label__correct-btn">
                    <BiPencil className = 'todo-list-label__icon' />
                </button>
            </div>
            {/* <MobileEditListLabel /> */}
        </li>
    )
};





































 {/* <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-clipboard"></use>
                </svg> */}
                {/* <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg> */}