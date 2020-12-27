import React from 'react'

export function NewTaskInput({onSave}) {
    const [taskText, setTaskText] = React.useState('');
    const writeTextHandler = event => setTaskText(event.target.value);
    const saveTaskHandler = event => {
        const KEY_ENTER = 13;
        if(event.keyCode === KEY_ENTER) {
            onSave(taskText)
            setTaskText('')
        }
    }

    return (
        <div className = 'add-todo add-todo_theme_dark'>
            <input className="" 
                   type="text" 
                   placeholder="+ Add todo" 
                   onChange = {writeTextHandler}
                   onKeyDown = {saveTaskHandler}
                   value = {taskText}  
            />
        </div>
        
    )
}

