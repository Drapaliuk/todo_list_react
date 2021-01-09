import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import { KEY_ENTER } from '../../../../../../service';
import classNames from 'classnames';

export function ChangeText({initialText, onSave, onComplete, onMakeImportant, onImportant, hasDone, isImportant}) {
    const [newTaskText, setNewTaskText] = React.useState('');
    const [isInvalidNewText, setInvalidNewTextFlag] = React.useState('');
    React.useEffect(() => {
        setNewTaskText(initialText)
    }, [initialText])
    
    const writeNewTaskText = event => {
        setNewTaskText(event.target.value)
        setInvalidNewTextFlag(false)
    }

    const updateTaskText = ({keyCode, ctrlKey}) => {
        const isEmptyField = !newTaskText.split(' ').some(el => el)

        if(keyCode === KEY_ENTER && ctrlKey && !isEmptyField) {
            setNewTaskText('')
            onSave(newTaskText)
            return
        }

        if(keyCode === KEY_ENTER && ctrlKey && isEmptyField) {
            setNewTaskText('')
            setInvalidNewTextFlag(true)
            return
        }
    }



    const completeHandler = event => {
        const isCompleted = event.target.checked;
        onComplete(isCompleted)
    }

    const makeImportantHandler = () => {onMakeImportant(!isImportant)}

    return (
        <div class="todo-full-text">
            <input checked = {hasDone} 
                   onChange = {completeHandler} 
                   type="checkbox" 
                   class="todo-full-text__check-input-todo" 
                   
                   />
            <textarea onKeyDown = {updateTaskText} 
                      onChange = {writeNewTaskText}  
                      value = {newTaskText} 
                      className = {classNames('todo-full-text__text', {'todo-full-text__text_invalid': isInvalidNewText})}
                      placeholder = {isInvalidNewText ? 'This field can`t be empty!' : 'Full text of current task'} 
            />
            <button onClick = {makeImportantHandler} class="todo-full-text__importantly-btn importantly-btn importantly-btn_todo importantly-btn_active">
                <AiOutlineStar className = {classNames('full-info__importantly-icon', {'full-info__importantly-icon_active': isImportant})} />
            </button>
        </div>
    )
}