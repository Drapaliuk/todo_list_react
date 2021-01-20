import React from 'react'
import { KEY_ENTER } from '../../../../service';
import classNames from 'classnames';

export function NewTaskInput({onSave, selectedListId}) {
    const [isInvalidTaskText, setInvalidFlag] = React.useState(false)
    const [taskText, setTaskText] = React.useState('');
    React.useEffect(() => {
        setInvalidFlag(false)
        setTaskText('')
    }, [selectedListId])

    const writeTextHandler = event => {
        setTaskText(event.target.value)
        setInvalidFlag(false)

    };
    const saveTaskHandler = ({keyCode}) => {
        const isEmptyField = !taskText.split(' ').some(el => el)
        if(keyCode === KEY_ENTER && !isEmptyField) {
            setTaskText('')
            onSave(selectedListId, taskText)
            return
        }

        if(keyCode === KEY_ENTER && isEmptyField) {
            setTaskText('')
            setInvalidFlag(!isInvalidTaskText)
            return
        }

    }

    return (
        <div className = {classNames ('add-todo-wrapper', {'add-todo_invalid': isInvalidTaskText})} >
            <input className = 'add-todo' 
                   type="text" 
                   placeholder={isInvalidTaskText ? 'This field can`t be empty!' : '+ Add todo'} 
                   onChange = {writeTextHandler}
                   onKeyDown = {saveTaskHandler}
                   value = {taskText}  
            />
            {/* <div className="add-todo__advise">
                press Enter to <AiOutlineSave />
            </div> */}
        </div>
        
    )
}

