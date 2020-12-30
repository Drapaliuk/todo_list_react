import React from 'react'
import { SubTask } from './subtask/SubTask'

export function Subtasks({subtasks, onCreate, onChangeText, onComplete, onDelete}) {
    React.useEffect(() => {
        console.log('ESE EFFECT RERENDER')
    }, [subtasks])
    const [text, writeText] = React.useState('')
    const createHandler = () => onCreate(text)
    const onWriteText = event => writeText(event.target.value)

    return (
        <div class="todo-subtasks">
            <div class="todo-subtasks__add-form">
                <button onClick = {createHandler} class="todo-subtasks__add-form-btn">+</button>
                <input onChange = {onWriteText} class="todo-subtasks__add-form-input" type="text" placeholder="add subtask" />
            </div>
            <ul class="todo-subtasks__list">
                { subtasks.map(subtask => <SubTask onComplete = {onComplete} 
                                                   text = {subtask.text}
                                                   onChangeText = {onChangeText} />) }                
            </ul>
        </div>
    )
}
