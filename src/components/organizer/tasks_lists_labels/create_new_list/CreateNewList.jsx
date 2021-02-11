import React from 'react'
import { FaClipboardList } from 'react-icons/fa';
import { KEY_ENTER } from '../../../../service';
import classNames from 'classnames';


export function CreateNewList({onVisibleNewList, onSave, onVisible}) {
    const [listName, setListName] = React.useState('');
    const [isInvalidName, setInvalidFlag] = React.useState(false);

    const onWriteName = event => {
        setListName(event.target.value)
        setInvalidFlag(false)
    }

    const saveHandler = ({keyCode}) => {
        const isEmptyField = !listName.split(' ').some(el => el)
        
        if(keyCode === KEY_ENTER && !isEmptyField) {
            onSave(listName)
            onVisible()
            return
        }

        if(keyCode === KEY_ENTER && isEmptyField) {
            setListName('')
            setInvalidFlag(!isInvalidName)
            return
        }
    }

    return (
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div className = 'todo-lists__create-new-list-wrapper'>
                <FaClipboardList className = 'todo-list-label__icon' />
                <input className = {classNames('todo-lists-folder__create-new', {'todo-lists-folder__create-new_invalid': isInvalidName})}
                       onChange = {onWriteName}
                       type="text"
                       autoFocus = {true}
                       value = {listName}  
                       placeholder={isInvalidName ? 'This field can`t be empty!' : 'list name'}
                       onKeyDown = {saveHandler}
                />
            </div>
        </li>
    )
}