import React from 'react'

export function FolderLabels() {
    return (
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div class="todo-lists-folder todo-list-label todo-list-label_with_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-folder"></use>
                </svg>
                <span class="folder name">Some folder</span>
                <button class="todo-list-label__correct-btn">
                    <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg>
                </button>
            </div>
            <ul class=" todo-lists-folder__inner-list">
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
                </li>
            </ul>
        </li>
    )
}

