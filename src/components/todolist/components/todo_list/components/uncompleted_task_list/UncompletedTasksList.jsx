import React, { Fragment } from 'react'
import { UncompletedTask } from './UncompletedTask';

export function UncompletedTasksList({uncompletedTasks, onSelectTask, onComplete}) {
    return (
        <ul className="todo-list">
            {uncompletedTasks.map(({text, _id}) => {
               return <UncompletedTask key = {_id} 
                                       text = {text}
                                       taskId = {_id}
                                       onComplete = {onComplete} 
                                       onSelectTask = {onSelectTask(_id)}
                    />
            })}
        </ul>
    )
};