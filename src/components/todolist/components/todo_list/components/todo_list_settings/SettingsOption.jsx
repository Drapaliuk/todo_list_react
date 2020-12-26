import React from 'react'

export function SettingsOption({value, handler, Icon}) {
    return (
        <li className="todo-list-settings__item">
            <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                <Icon className="todo-list-settings-option__icon" />
                <span className="todo-list-settings-option__text">{value}</span>
            </button>
        </li>
    )
}

