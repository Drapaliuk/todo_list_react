import React from 'react'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { Task } from '../task/Task';

export function CompletedTasksList({completedTasks, onSelectTask, onComplete, selectedTaskId}) {
    const [isVisibleCompletedTasks, setVisibleCompletedTasks] = React.useState(false);
    const onVisibleCompletedTasks = () => setVisibleCompletedTasks(!isVisibleCompletedTasks)

    return (
        <>
            <div className="visible-completed-todo visible-completed-todo_theme_dark">
                <button onClick = {onVisibleCompletedTasks} className="visible-completed-todo__btn">
                    <span className = 'completed-tasks_amount'>
                        {completedTasks.length}
                    </span>
                    completed item
                </button>
                    <div className = 'visible-completed-todo__icon-wrapper'  onClick = {onVisibleCompletedTasks}>
                        {
                            isVisibleCompletedTasks 
                                ? 
                            <IoMdEye className = 'visible-completed-todo__icon' />
                                :
                            <IoMdEyeOff className = 'visible-completed-todo__icon' />  
                        } 
                    </div>
            </div>
            {
                isVisibleCompletedTasks &&
                <ul className="todo-list">
                    {completedTasks.map(currentTask => <Task {...{key: currentTask._id, onSelectTask, onComplete, currentTask, selectedTaskId}} />)}
                </ul>
            }
        </>
    )
}