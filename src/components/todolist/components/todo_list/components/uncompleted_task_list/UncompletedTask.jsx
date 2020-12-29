import React from 'react'
import {RiPushpinFill, RiPushpin2Fill} from 'react-icons/ri';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import classNames from 'classnames';
import { IconPin } from '../../../../../../assets/svg/IconPin';


export function UncompletedTask({text, onSelectTask, onComplete, taskId, onPin, onMakeImportant, isPinned, isImportant}) {


    const taskHandler = event => {
        const role = event.target.dataset.role
        console.log(role)
        if(role === 'complete') return onComplete()
        if(role === 'task') return onSelectTask()
        // if(role === 'pin') return onPin(!isPinned, taskId) //!-????????????????
        // if(role === 'important') return onMakeImportant(!isImportant, taskId)
    }

    const completeHandler = event => {
        const isCompleted = event.target.checked;
        onComplete(isCompleted, taskId)
    }

    const pinHandler = () => onPin(!isPinned, taskId)
    const makeImportantHandler = () => onMakeImportant(!isImportant, taskId)

    return (
        <li  onClick = {taskHandler} className="todo-list__item">
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

