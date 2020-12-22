import React from 'react'

export function CompletedTask() {
    return (
        <li className="todo-list__item">
            <div className="todo todo_theme_dark todo_completed">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">Todo text</div>
            </div>
        </li>
    )
}