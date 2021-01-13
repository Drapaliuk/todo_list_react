import React from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import classNames from 'classnames';
import { IconPin } from '../../../../../../assets/svg/IconPin';
import { FullInfo } from '../../../todo_full_info/FullInfoDesktop';


export function UncompletedTask({onSelectTask, onComplete, onPin, onMakeImportant, currentTask, currentTheme,  isSelectedTask}) {
    
    const {text, _id: taskId, isPinned, isImportant} = currentTask;

    const taskHandler = event => {
        const role = event.target.dataset.role
        if(role === 'complete') {
            const isCompleted = event.target.checked
            onComplete(isCompleted, taskId)
        }
        if(role === 'task') {
             onSelectTask()
             return
        }
    }

    const pinHandler = () => onPin(!isPinned, taskId)
    const makeImportantHandler = () => onMakeImportant(!isImportant, taskId)

    return (
        <li  onClick = {taskHandler} className="todo-list__item">
            <div {...{'data-role':'task'}} className="todo">
                <input {...{'data-role':'complete'}} className="todo__check-input" type="checkbox"/>
                <div {...{'data-role':'task'}} className="todo__text">{text}</div>
                <button {...{'data-role':'pin'}} onClick = {pinHandler} className="pin-btn pin-btn_todo">
                    <IconPin className = {classNames('pin-btn__icon', {'pin-btn_active': isPinned})} />
                </button>
                <button onClick = {makeImportantHandler} className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <AiOutlineStar {...{'data-role':'important'}} className = {classNames('importantly-btn__icon', {'importantly-btn_active': isImportant})}/>
                </button>
            </div>
            {
                isSelectedTask === taskId &&
                <FullInfo isMobileVer = {true} selectedTask = {currentTask} currentTheme = 'dark' />
            }
        </li>
    )
}

