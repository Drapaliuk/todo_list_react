import React from 'react'
import { AiOutlineStar} from 'react-icons/ai'
import classNames from 'classnames';
import { IconPin } from '../../../../../../assets/svg/IconPin';


export function UncompletedTask({text, onSelectTask, onComplete, taskId, onPin, onMakeImportant, isPinned, isImportant, belongToList}) {
    const taskHandler = event => {
        const role = event.target.dataset.role
        if(role === 'complete') return onComplete()
        if(role === 'task') return onSelectTask()
    }

    const completeHandler = event => {
        const isCompleted = event.target.checked;
        onComplete(belongToList, taskId, isCompleted)
    }

    const pinHandler = () => onPin(belongToList, taskId,!isPinned)
    const makeImportantHandler = () => onMakeImportant(belongToList, taskId, !isImportant)

    return (
        <li onClick = {taskHandler} className="todo-list__item">
            <div {...{'data-role':'task'}} className="todo todo_theme_dark">
                <input {...{'data-role':'complete'}} onChange = {completeHandler} className="todo__check-input" type="checkbox"/>
                <div {...{'data-role':'task'}} className="todo__text">{text}</div>
                <button onClick = {pinHandler} className="pin-btn pin-btn_todo">
                    <IconPin className = {classNames('pin-btn__icon', {'pin-btn_active': isPinned})} />
                </button>
                <button onClick = {makeImportantHandler} className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <AiOutlineStar {...{'data-role':'important'}} className = {classNames('importantly-btn__icon', {'importantly-btn_active': isImportant})}/>
                </button>
            </div>
        </li>
    )
}
