import React from 'react'
import { KEY_ENTER } from '../../../../../service/keyboard_codes'
import { SubTask } from './subtask/SubTask'

export function Subtasks({subtasks, onCreate, onUpdateText, onComplete, onDelete}) {
    React.useEffect(() => {
    }, [subtasks])
    const [text, writeText] = React.useState('')
    const [openFullTextSubtaskID, setOpenFullText] = React.useState('');

    const onOpenSubtask = id => setOpenFullText(id)

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
            <ul class="todo-subtasks__list">
                { subtasks.map(subtask => <SubTask key = {subtask._id}
                                                   id = {subtask._id} 
                                                   onDelete = {onDelete}
                                                   onComplete = {onComplete} 
                                                   text = {subtask.text}
                                                   onOpen = {onOpenSubtask}
                                                   isOpen = {subtask._id === openFullTextSubtaskID}
                                                   hasDone = {subtask.hasDone}
                                                   onUpdateText = {onUpdateText} />) }
            </ul>
        </div>
    )
}
