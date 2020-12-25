import React from 'react'

export function SettingsOption({value, handler}) {
    return (
        <li className="todo-list-settings__item">
            <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                <svg className="todo-list-settings-option__icon">
                    <use href="./src/img/sprite.svg#icon-wall-clock"></use>
                </svg>
                <span className="todo-list-settings-option__text">{value}</span>
            </button>
        </li>
    )
}

