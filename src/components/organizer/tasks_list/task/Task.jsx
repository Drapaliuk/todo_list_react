import React from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import classNames from 'classnames';
import { IconPin } from '../../../../assets/svg/IconPin';
import { TaskFullInfo } from '../../';

export function Task({onSelectTask, onComplete, onPinTask, onMakeImportant, currentTask,  selectedTaskId}) {
    const {text, _id: currentTaskId, isPinned, isImportant, belongToList, hasDone} = currentTask;
    const taskHandler = event => {
        const role = event.target.dataset.role
        if(role === 'complete') {
            const isCompleted = event.target.checked
            onComplete(belongToList, currentTaskId, isCompleted)

        }
        if(role === 'task') {
             onSelectTask(belongToList, currentTaskId)
             return
        }
    }

    const pinHandler = () => onPinTask(belongToList, currentTaskId, !isPinned)
    const makeImportantHandler = () => onMakeImportant(belongToList, currentTaskId, !isImportant)
    return (
        <li onClick = {taskHandler} className = {classNames('todo-list__item', {
            
        })}>
            <div {...{'data-role':'task'}} className={classNames('todo', {
                todo_completed: hasDone,
                'todo_selected': selectedTaskId === currentTaskId
            })} >
                <input {...{'data-role':'complete'}} checked = {hasDone} className="todo__check-input" type="checkbox"/>
                <div {...{'data-role':'task'}} className="todo__text">{text}</div>
                {
                    !hasDone 
                        ?
                    <>
                        <button {...{'data-role':'pin'}} onClick = {pinHandler} className="pin-btn pin-btn_todo">
                            <IconPin className = {classNames('pin-btn__icon', {'pin-btn_active': isPinned})} />
                        </button>
                        <button onClick = {makeImportantHandler} className="importantly-btn importantly-btn_todo importantly-btn_active">
                            <AiOutlineStar {...{'data-role':'important'}} className = {classNames('importantly-btn__icon', {'importantly-btn_active': isImportant})}/>
                        </button>
                    </>
                        :
                    null
                    // <button>del</button>
                }
                
            </div>
            {
                selectedTaskId === currentTaskId &&
                <TaskFullInfo isMobileVer = {true} selectedTask = {currentTask} currentTheme = 'dark' />
            }
        </li>
    )
}

