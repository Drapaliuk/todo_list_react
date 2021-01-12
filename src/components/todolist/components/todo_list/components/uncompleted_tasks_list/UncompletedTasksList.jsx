import React from 'react'
import { UncompletedTask } from '../uncompleted_task/UncompletedTask';

export function UncompletedTasksList({uncompletedTasks, onSelectTask, onComplete, onPin, onMakeImportant, isSelectedTask}) {

    return (
        <ul className="todo-list">
            {uncompletedTasks.map(task => {
               return <UncompletedTask key = {task._id} 
                                       onComplete = {onComplete} 
                                       onSelectTask = {onSelectTask(task._id)}
                                       onPin = {onPin}
                                       onMakeImportant = {onMakeImportant}
                                       currentTask = {task}
                                       isSelectedTask = {isSelectedTask}
                    />
            })}
        </ul>
    )
};