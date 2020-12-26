import React from 'react';
import classNames from 'classnames'

export function SortingOption({title, sortByHandler, Icon, isActive}) {
    // todo-list-settings-option todo-list-settings-option_theme_dark 
    // todo-list-settings-option_theme_dark
    return (
        <li className="todo-list-settings__item">
            {/* {isActive ? 'active': null} */}
            <button onClick = {sortByHandler} className={
                classNames("todo-list-settings-option",
                            {'todo-list-settings-option_active': isActive})
                }>
                <Icon className="todo-list-settings-option__icon" />
                <span className="todo-list-settings-option__text">{title}</span>
            </button>
        </li>
    )
}