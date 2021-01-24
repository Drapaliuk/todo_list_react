import React from 'react';
import classNames from 'classnames'

export function SortingOption({title, handler, Icon, isActive}) {

    return (
        <li className="todo-list-settings__item">
            <button onClick = {handler} className={
                classNames("todo-list-settings-option",
                            {'todo-list-settings-option_active': isActive})
                }>
                <Icon className="todo-list-settings-option__icon" />
                <span className="todo-list-settings-option__text">{title}</span>
            </button>
        </li>
    )
}