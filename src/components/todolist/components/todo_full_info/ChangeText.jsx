import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';

export function ChangeText({initialText, onSave, onComplete, onMakeImportant, onImportant, hasDone, isImportant}) {
    const [newTaskText, setNewTaskText] = React.useState('');
    React.useEffect(() => {
        setNewTaskText(initialText)
    }, [initialText])
    
    const newTextHandler = event => setNewTaskText(event.target.value)
    const saveNewTextHandler = event => {
        const ENTER_KEY = 13
        if(event.keyCode === ENTER_KEY && event.ctrlKey) {
            onSave(newTaskText)
        }
    }

    const completeHandler = event => {
        const isCompleted = event.target.checked;
        onComplete(isCompleted)
    }

    const makeImportantHandler = () => {onMakeImportant(!isImportant)}

    return (
        <div class="todo-full-text">
            <input checked = {hasDone} onChange = {completeHandler} type="checkbox" class="todo-full-text__check-input-todo" />
            <textarea onKeyDown = {saveNewTextHandler} onChange = {newTextHandler}  value = {newTaskText} class="todo-full-text__text" name="" placeholder="fulltext"></textarea>
            <button onClick = {makeImportantHandler} class="todo-full-text__importantly-btn importantly-btn importantly-btn_todo importantly-btn_active">
                <AiOutlineStar className = 'todo-full-text__icon importantly-btn__icon' fill = {'yellow'} />
            </button>
        </div>
    )
}
