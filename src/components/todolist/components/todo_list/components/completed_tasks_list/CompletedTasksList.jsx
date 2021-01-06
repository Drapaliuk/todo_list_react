import React, { Fragment } from 'react'
import { CompletedTask } from '../completed_task/CompletedTask';

export function CompletedTasksList({completedTasks, onSelectTask, onComplete}) {
    const [isVisibleCompletedTasks, setVisibleCompletedTasks] = React.useState(false);
    const onVisibleCompletedTasks = () => setVisibleCompletedTasks(!isVisibleCompletedTasks)

    return (
        <Fragment>
            <div className="visible-completed-todo visible-completed-todo_theme_dark">
                <button onClick = {onVisibleCompletedTasks} className="visible-completed-todo__btn">completed item</button>
                <svg className="visible-completed-todo__icon">
                    <use href="./src/img/sprite.svg#icon-eye"></use>
                </svg>
                <svg className="icon">
                    <use href="./src/img/sprite.svg#icon-eye-blocked"></use>
                </svg>
            </div>
            {
                isVisibleCompletedTasks &&
                <ul className="todo-list">
                    {completedTasks.map(({text, _id}) => {
                        return <CompletedTask key = {_id}
                                              text = {text}
                                              onSelectTask = {onSelectTask}
                                              onComplete = {onComplete}
                                              taskId = {_id}    
                        />
                    })}
                </ul>
            }
        </Fragment>
    )
}