import React from 'react'
import {AiOutlineSave} from 'react-icons/ai'
import { KEY_ENTER } from '../../../../../../service';

export function NewTaskInput({onSave}) {
    const [taskText, setTaskText] = React.useState('');
    const writeTextHandler = event => setTaskText(event.target.value);
    const saveTaskHandler = ({keyCode}) => {
        if(keyCode === KEY_ENTER) {
            onSave(taskText)
            setTaskText('')
        }
    }

    return (
        <div className = 'add-todo-wrapper'>
            <input className="add-todo" 
                   type="text" 
                   placeholder="+ Add todo" 
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

