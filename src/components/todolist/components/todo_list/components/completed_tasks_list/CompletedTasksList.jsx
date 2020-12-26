import React, { Fragment } from 'react'
import { CompletedTask } from './CompletedTask';

export function CompletedTasksList({completedTasks}) {
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
                    {completedTasks.map(task => <CompletedTask text = {task.text} />)}
                </ul>
            }
        </Fragment>
    )
}