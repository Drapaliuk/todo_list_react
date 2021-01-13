import React from 'react'
import { FaClipboardList } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export function TasksListLabel({name, tasksAmount, id, onSelectList, selectedListId}) {
    const isItSelectedList = id === selectedListId
    return (
        <li onClick = {onSelectList(id)} class={classNames("bar-section__labels-list-item", {'bar-section__labels-list-item_selected': isItSelectedList})}>
            <NavLink className = 'bar-section__labels-link' to = '/app/list'>
                <div class="todo-list-label todo-list-label_with_correct_btn">
                    <FaClipboardList className = 'todo-list-label__icon' />
                    <span class="todo-list-label__name">{name} </span>
                    <span class= {classNames("todo-list-label__task-amount", {'todo-list-label__task-amount_selected': isItSelectedList})}  >{tasksAmount}</span>
                    <NavLink onClick = {onSelectList(id, name)} 
                            to = '/app/edit-list' 
                            className = {classNames("todo-list-label__correct-btn", {'todo-list-label__correct-btn_selected': isItSelectedList})}>
                        <BiPencil className = 'todo-list-label__icon' />
                    </NavLink>
                </div>
            </NavLink>
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