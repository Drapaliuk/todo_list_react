import React from 'react'

export function CompletedTask({onSelectTask, onComplete, currentTask}) {
    const [completeStatus, setCompleteStatus] = React.useState(true);
    const {text, belongToList, _id: taskId} = currentTask;
    const taskHandler = event => {
        const role = event.target.dataset.role
        if(role === 'complete') {
            const isCompleted = event.target.checked
            onComplete(belongToList, taskId, isCompleted)
            setCompleteStatus(false)
        }
        if(role === 'task') {
             onSelectTask(belongToList, taskId)
             return
        }
    }

    return (
        <li onClick = {taskHandler} className="todo-list__item">
            <div {...{'data-role':'task'}} className="todo todo_completed">
                <input {...{'data-role':'complete'}} checked = {completeStatus} className="todo__check-input" type="checkbox"/>
                <div {...{'data-role':'task'}} className="todo__text">{text}</div>
            </div>
        </li>
    )
}

