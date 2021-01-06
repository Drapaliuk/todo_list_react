import React from 'react'
import { FaClipboardList } from 'react-icons/fa';
import { KEY_ENTER } from '../../../../../../service';

export function CreateNewList({onSave, onVisible}) {
    const [name, setName] = React.useState('')
    const onWriteName = event => setName(event.target.value)

    const saveHandler = ({keyCode, ctrlKey}) => {
        if(keyCode === KEY_ENTER && ctrlKey) {
            onSave(name)
            onVisible()
        }
    }

    return (
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div class="todo-list-label">
                <FaClipboardList className = 'todo-list-label__icon' />
                <input class="todo-lists-folder__create-new" 
                       onChange = {onWriteName}
                       type="text" 
                       value = {name}  
                       placeholder="list name"
                       onKeyDown = {saveHandler}
                />
            </div>
        </li>
    )
}