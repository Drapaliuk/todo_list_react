import React from 'react'
import { FaClipboardList } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MobileEditListLabel } from '../mobile_edit_list_label/MobileEditListLabel';

export function TasksListLabel({name, tasksAmount, id, isThisListSelected, onSelectList, selectedListId, isOpenedEditMenu, onOpenEditMenu}) {
    const isItSelectedList = id === selectedListId
    let touchStartTimestamp;
    
    const pointerDownHandler = () => {
        touchStartTimestamp = Date.now();
    }

    const pointerUpHandler = () => {
        let currentTime = Date.now();
        if(currentTime - touchStartTimestamp >= 700) {
            onOpenEditMenu(id)
        }
    }

    const contextMenuHandler = e => e.preventDefault()


    return (
        <li onPointerDown = {pointerDownHandler}
            onPointerUp = {pointerUpHandler}
            onClick = {onSelectList(id)} 
            onContextMenu = {contextMenuHandler}
            class={classNames("bar-section__labels-list-item", {'bar-section__labels-list-item_selected': isThisListSelected})}>
            
            
            <NavLink className = 'bar-section__labels-link' to = '/app/list'>
                <div class="todo-list-label todo-list-label_with_correct_btn">
                    <FaClipboardList className = 'todo-list-label__icon' />
                    <span class="todo-list-label__name">{name} </span>
                    <span class= {classNames("todo-list-label__task-amount", {'todo-list-label__task-amount_selected': isThisListSelected})}  >{tasksAmount}</span>
                    <NavLink onClick = {onSelectList(id, name)} 
                            to = '/app/edit-list' 
                            className = {classNames("todo-list-label__correct-btn", {'todo-list-label__correct-btn_selected': isThisListSelected})}>
                        <BiPencil className = 'todo-list-label__icon' />
                    </NavLink>
                </div>
            </NavLink>
            {/* {
                isOpenedEditMenu && <MobileEditListLabel />
            } */}
            
        </li>
    )
};





































 {/* <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-clipboard"></use>
                </svg> */}
                {/* <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg> */}