import React from 'react'

export function NewTaskInput({onSaveTask}) {
    const [newTaskText, setNewTaskText] = React.useState('');
    const onWriteTaskText = event => setNewTaskText(event.target.value);

    return (
        <input className="add-todo add-todo_theme_dark" 
                   type="text" 
                   placeholder="+ Add todo" 
                   onChange = {onWriteTaskText}
                   onKeyDown = {onSaveTask(newTaskText)}
                   value = {newTaskText}  
        />
    )
}

