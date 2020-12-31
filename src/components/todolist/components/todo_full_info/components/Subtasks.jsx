import React from 'react'
import { KEY_ENTER } from '../../../../../service/keyboard_codes'
import { SubTask } from './subtask/SubTask';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

export function Subtasks({subtasks, onCreate, onUpdateText, onComplete, onDelete}) {
    const [text, writeText] = React.useState('')
    const [openFullTextSubtaskID, setOpenFullText] = React.useState('');
    const [isVisibleSubtasksList, setVisibleSubtasksList] = React.useState(false); 

    const onOpenSubtask = id => setOpenFullText(id)
    const visibleSubtasksListHandler = () => setVisibleSubtasksList(!isVisibleSubtasksList);
    const createHandler = () => {
        onCreate(text)
        writeText('')
    }

    const keyboardCreateHandler = ({keyCode}) => {
        if(keyCode === KEY_ENTER) {
            createHandler()
        }
    }
    const onWriteText = event => writeText(event.target.value)

    return (
        <div class="todo-subtasks">
            <div class="todo-subtasks__add-form">
                <button onClick = {createHandler} class="todo-subtasks__add-form-btn">+</button>
                <input onKeyDown = {keyboardCreateHandler} 
                       onChange = {onWriteText} 
                       class="todo-subtasks__add-form-input" 
                       type="text" 
                       placeholder="add subtask"
                       value = {text}
                />
            </div>
            <button onClick = {visibleSubtasksListHandler} className = 'subtasks__open-btn'>
                <span>3</span>
                <span>subtask</span>
                {isVisibleSubtasksList ? <RiArrowDownSLine className = 'subtasks__open-icon' /> : <RiArrowUpSLine className = 'subtasks__open-icon' />}
            </button>
            {
                isVisibleSubtasksList &&
                <ul class="todo-subtasks__list">
                { subtasks.map(({_id, text, hasDone}) => <SubTask key = {_id}
                                                           id = {_id} 
                                                           onDelete = {onDelete}
                                                           onComplete = {onComplete} 
                                                           text = {text}
                                                           onOpen = {onOpenSubtask}
                                                           isOpen = {_id === openFullTextSubtaskID}
                                                           hasDone = {hasDone}
                                                           onUpdateText = {onUpdateText} />) }
            </ul>
            }
            <div className = 'subtasks__open-btn'>
            <button onClick = {visibleSubtasksListHandler}>
                up
            </button>
            <button onClick = {visibleSubtasksListHandler}>
                close
            </button>

            </div>
            

        </div>
    )
}
