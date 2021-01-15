import React, { Fragment } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { KEY_ENTER } from '../../../../service';

import classNames from 'classnames';


export function SubTask({id, text, onUpdateText, onComplete, onOpen, isOpen, hasDone, onDelete}) {
    const [newText, writeNewText] = React.useState(text);
    const [isVisibleCorrecting, setVisibleCorrecting] = React.useState(false);

    const completeHandler = event => onComplete(id, event.target.checked)
    const writeTextHandler = event => writeNewText(event.target.value)
    const deleteHandler = () => onDelete(id)


    const correctionHandler = () => {
        writeNewText(text)
        setVisibleCorrecting(true)
    }
    
    const cancelCorrection = () => {
        writeNewText('')
        setVisibleCorrecting(false)
    }
    const updateTextHandler = ({keyCode}) => {
        if(keyCode === KEY_ENTER) {
            onUpdateText(id, newText)
            setVisibleCorrecting(false)
        }
    }

    const visibleFullTextHandler = () => {
        if(!isVisibleCorrecting) {
            onOpen(id)
        }
        if(isOpen) {
            onOpen('')
        }
    }


    return (
        <li onClick = {visibleFullTextHandler} onDoubleClick = {correctionHandler} class="todo-subtasks__list-item">
            <div class="todo-subtask">
                {
                    isVisibleCorrecting 
                    ?
                    <Fragment>
                        <input onBlur = {cancelCorrection} 
                               className = 'todo-subtask__correction-input' 
                               onKeyDown = {updateTextHandler} 
                               onChange = {writeTextHandler} 
                               type="text" 
                               value = {newText}
                               autoFocus = {true}
                               />
                    </Fragment>
                    :
                    <Fragment>
                        <input  checked = {hasDone} onChange = {completeHandler} class="todo-subtask__check-input-subtask" type="checkbox" />
                        <span class= {classNames("todo-subtask__text", {'todo-subtask__text_full': isOpen})}   >{text}</span>
                        <button  onClick = {deleteHandler} class="delete-btn delete-btn_todo_subtask">
                            <AiOutlineClose className="delete-btn__icon" />
                        </button>
                    </Fragment>
                }
            </div>
        </li>
    )
}