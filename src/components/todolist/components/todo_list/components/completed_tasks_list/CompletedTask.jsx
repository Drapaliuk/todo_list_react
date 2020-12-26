import React from 'react'

export function CompletedTask({text, onSelectTask, onComplete, taskId,}) {
    const [isCompleted, setCompleted] = React.useState(true);
    return (
        <li className="todo-list__item">
            <div className="todo todo_theme_dark todo_completed">
                <input checked = {isCompleted} className="todo__check-input" type="checkbox"/>
                <div className="todo__text">{text}</div>
            </div>
        </li>
    )
}