import React from 'react'

export function CompletedTask({text, onSelectTask, onComplete}) {
    const [isCompleted, setCompleted] = React.useState(true);
    const completeHandler = event => {
        const isCompleted = event.target.checked;
        if(!isCompleted) {
            onComplete(false)
            setCompleted(false)
            return 
        }
    }

    return (
        <li onClick = {onSelectTask} className="todo-list__item">
            <div className="todo todo_completed">
                <input onChange = {completeHandler} checked = {isCompleted} className="todo__check-input" type="checkbox"/>
                <div className="todo__text">{text}</div>
            </div>
        </li>
    )
}

