import React from 'react'
import { FaClipboardList } from 'react-icons/fa';

export function CreateNewList({newListName, setNewListName}) {
    const onListName = event => {
        console.log(event.target.value)
        setNewListName(event.target.value)
    }

    return (
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div class="todo-lists-folder todo-list-label">
                <FaClipboardList className = 'todo-list-label__icon' />
                <input class="todo-lists-folder__create-new" 
                       onChange = {onListName}
                       type="text" 
                       value = {newListName}  
                       placeholder="list name" 
                />
                <button>+</button>
            </div>
        </li>
    )
}