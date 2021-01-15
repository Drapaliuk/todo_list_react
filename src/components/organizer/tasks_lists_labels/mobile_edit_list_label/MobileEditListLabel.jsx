import React from 'react'

export function MobileEditListLabel() {
    return (
        <ul class="bar-section__edit-todo-list-menu">
                <li class="bar-section__edit-todo-list-menu-item">
                    <button class="todo-list-settings-option todo-list-settings-option_theme_dark">
                        <svg class="todo-list-settings-option__icon">
                            <use href="./src/img/sprite.svg#icon-mute"></use>
                        </svg>
                        <span class="todo-list-settings-option__text">Don`t disturbe
                            <span
                                class="todo-list-settings-option__disturb-status todo-list-settings-option__disturb-status_on">on</span>
                        </span>
                    </button>
                </li>
                <li class="bar-section__edit-todo-list-menu-item">
                    <button class="todo-list-settings-option todo-list-settings-option_theme_dark">
                        <svg class="todo-list-settings-option__icon">
                            <use href="./src/img/sprite.svg#icon-pen"></use>
                        </svg>
                        <span class="todo-list-settings-option__text">Rename</span>
                    </button>
                </li>
                <li class="bar-section__edit-todo-list-menu-item">
                    <button class="todo-list-settings-option todo-list-settings-option_theme_dark">
                        <svg class="todo-list-settings-option__icon">
                            <use href="./src/img/sprite.svg#icon-delete"></use>
                        </svg>
                        <span class="todo-list-settings-option__text">Delete </span>
                    </button>
                </li>
            </ul>

    )
}