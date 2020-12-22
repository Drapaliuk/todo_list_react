import React from 'react'

export function CreateFolder() {
    return (
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div class="todo-lists-folder todo-list-label">
                <svg class="todo-lists-folder__icon todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-folder"></use>
                </svg>
                <input class="todo-lists-folder__create-new" type="text" placeholder="folder name" />
            </div>
        </li>
    )
}