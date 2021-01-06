import React from 'react'
import { UncompletedTask } from '../uncompleted_task/UncompletedTask';

export function UncompletedTasksList({uncompletedTasks, onSelectTask, onComplete, onPin, onMakeImportant}) {

    return (
        <ul className="todo-list">
            {uncompletedTasks.map(({text, _id, isPinned, isImportant}) => {
               return <UncompletedTask key = {_id} 
                                       text = {text}
                                       taskId = {_id}
                                       onComplete = {onComplete} 
                                       onSelectTask = {onSelectTask(_id)}
                                       onPin = {onPin}
                                       onMakeImportant = {onMakeImportant}
                                       isPinned = {isPinned}
                                       isImportant = {isImportant}
                    />
            })}
        </ul>
    )
};