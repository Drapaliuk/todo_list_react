import React from 'react'
import {RiPushpinFill, RiPushpin2Fill} from 'react-icons/ri';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import classNames from 'classnames';


export function UncompletedTask({text, onSelectTask, onComplete, taskId, onPin, onMakeImportant, isPinned, isImportant}) {

    const completeHandler = event => {
        const isCompleted = event.target.checked;
        // if(isCompleted) return onComplete(true, taskId)
        onComplete(isCompleted, taskId)
    }

    const pinHandler = () => onPin(!isPinned, taskId)
    const makeImportantHandler = () => onMakeImportant(!isImportant, taskId)

    return (
        <li  onClick = {onSelectTask} className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input onChange = {completeHandler} className="todo__check-input" type="checkbox"/>
                <div className="todo__text">{text}</div>
                <button onClick = {pinHandler} className="pin-btn pin-btn_todo">
                    {
                        isPinned ? 
                            <RiPushpin2Fill className = 'pin-btn__icon pin-btn_active' />
                                 :
                            <RiPushpinFill className = 'pin-btn__icon' />
                    }
                    
                </button>
                <button onClick = {makeImportantHandler} className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <AiOutlineStar className = {classNames('importantly-btn__icon', {'importantly-btn_active': isImportant})}/>
                </button>
            </div>
        </li>
    )
}

