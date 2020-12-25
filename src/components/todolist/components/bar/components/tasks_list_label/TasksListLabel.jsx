import React from 'react'
import { MobileEditListLabel } from '../mobile_edit_list_label/MobileEditListLabel'
import { FaClipboardList } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export function TasksListLabel({name, tasksAmount, id, onSelectList}) {
    return (
        <li onClick = {onSelectList(id)} key = {id} class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_with_correct_btn">
                <FaClipboardList className = 'todo-list-label__icon' />
                <span class="todo-list-label__name">{name} </span>
                <span class="todo-list-label__task-amount">{tasksAmount}</span>
                <NavLink onClick = {onSelectList(id)} to = '/tasks/edit-list' className = "todo-list-label__correct-btn">
                    <BiPencil className = 'todo-list-label__icon' />
                </NavLink>
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