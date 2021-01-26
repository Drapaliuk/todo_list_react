import React, { Fragment } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { KEY_ENTER } from '../../../../service';
import { HiOutlinePencil } from 'react-icons/hi';
import classNames from 'classnames';


export function SubTask({id, text, setCorrectionSubtaskId, isCorrecting,  onUpdateText, onComplete, onOpen, isOpen, hasDone, onDelete}) {
    const [newText, writeNewText] = React.useState(text);
    const [correctionMode, setCorrectionMode] = React.useState(false);

    const completeHandler = event => onComplete(id, event.target.checked)
    const writeTextHandler = event => writeNewText(event.target.value)
    const deleteHandler = () => onDelete(id)
    console.log('isCorrecting', isCorrecting)
    const switchCorrectionMode = () => {
        writeNewText(text)
        if(isCorrecting) {
            return setCorrectionSubtaskId('')
        }
        setCorrectionSubtaskId(id)
    }
    
    const cancelCorrection = () => {
        writeNewText('')
        setCorrectionMode(false)
    }
    const updateTextHandler = ({keyCode}) => {
        if(keyCode === KEY_ENTER) {
            onUpdateText(id, newText)
            setCorrectionMode(false)
        }
    }

    const visibleFullTextHandler = () => {
        if(!correctionMode) {
            onOpen(id)
        }
        if(isOpen) {
            onOpen('')
        }
    }

    return (
        <li 
            onClick = {visibleFullTextHandler}
            className = 'todo-subtasks__list-item' >
            <div className = {classNames('todo-subtask', {'todo-subtask_done': hasDone, 'todo-subtask_correction-mode': isCorrecting})}>
                {
                    isCorrecting 
                    ?
                    <>
                        <input onBlur = {cancelCorrection} 
                               className = 'todo-subtask__correction-input' 
                               onKeyDown = {updateTextHandler} 
                               onChange = {writeTextHandler} 
                               type="text" 
                               value = {newText}
                               autoFocus = {true}
                               />
                        <button  onClick = {switchCorrectionMode} class="delete-btn delete-btn_todo_subtask">
                            <AiOutlineClose  className="delete-btn__icon" fill = '#e01f3d' />
                        </button>
                    </>
                    :
                    <Fragment>
                        <input  checked = {hasDone} onChange = {completeHandler} class="todo-subtask__check-input-subtask" type="checkbox" />
                        <span class= {classNames("todo-subtask__text", {'todo-subtask__text_full': isOpen})}   >{text}</span>
                        <button onClick = {switchCorrectionMode} className = 'todo-subtask__correcting-btn'>
                            <HiOutlinePencil className = 'todo-subtask__correcting-icon' />
                        </button>
                        <button  onClick = {deleteHandler} class="delete-btn delete-btn_todo_subtask">
                            <AiOutlineClose className="delete-btn__icon" />
                        </button>
                    </Fragment>
                }
            </div>
        </li>
    )
}