import React from 'react'
import { Task } from '../task/Task';

export function UncompletedTasksList({uncompletedTasks, onSelectTask, onComplete, onPin, onMakeImportant, isSelectedTask}) {
    return (
        <ul className="todo-list">
            {uncompletedTasks.map(task => {
               return <Task key = {task._id} 
                                       onComplete = {onComplete} 
                                       onSelectTask = {onSelectTask}
                                       onPin = {onPin}
                                       onMakeImportant = {onMakeImportant}
                                       currentTask = {task}
                                       isSelectedTask = {isSelectedTask}
                    />
            })}
        </ul>
    )
};