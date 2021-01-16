import React from 'react'
import {BsTrash} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { deleteTasksList, updateTasksList } from '../../../../redux/actions';
import { getSelectedListId, getSelectedListProperty } from '../../../../redux/selectors';
import { KEY_ENTER } from '../../../../service';
import classNames from 'classnames';

export function EditListLabelDesktop() {
    const dispatch = useDispatch();
    const {goBack} = useHistory()
    const currentListName = useSelector(state => getSelectedListProperty(state, 'name'))
    const selectedListId = useSelector(state => getSelectedListId(state));
    const [newName, setNewName] = React.useState(currentListName);
    const [isInvalidName, setInvalidFlag] = React.useState(false)
    const [previousListId] = React.useState(selectedListId)

    if(previousListId !== selectedListId) {
        return <Redirect to = '/app' />
    }
    const onDeleteList = () => {
        dispatch(deleteTasksList(selectedListId))
        goBack()
    };
    const isEmptyField = !newName.split(' ').some(el => el)


    const onWriteNewName = event => {
        setNewName(event.target.value)
        setInvalidFlag(false)
    }

    const renameHandlerByClick = () => {
        
        if(!isEmptyField) {
            dispatch(updateTasksList(selectedListId, {name: newName}))
            goBack()
            return
        }

        if(isEmptyField) {
            setNewName('')
            setInvalidFlag(!isInvalidName)
            return
        }
    }


    const renameHandlerByKeyboard = ({keyCode, ctrlKey}) => {
        if(keyCode === KEY_ENTER && ctrlKey && !isEmptyField) {
            dispatch(updateTasksList(selectedListId, {name: newName}))
            goBack()
            return
        }

        if(keyCode === KEY_ENTER && ctrlKey && isEmptyField) {
            setNewName('')
            setInvalidFlag(!isInvalidName)
            return
        }
    }




    return (
        <div className="edit-list-label edit-list-label_theme-dark">
        <h2 className="edit-list-label__header">Edit: {'a'}</h2>
        <input className = {classNames('edit-list-label__new-name', {'edit-list-label__new-name_invalid': isInvalidName})} 
               type="text" 
               placeholder = {isInvalidName ? 'This field can`t be empty!' : "new list name"}
               value = {newName}
               onKeyDown = {renameHandlerByKeyboard}
               onChange = {onWriteNewName}
               
         />
        {/* <ul className="edit-list-options edit-list-label__options-list">
            <li className="edit-list-option edit-list-label__options-list-item">
                <input className="edit-list-label__dont-disturbe-input" id='dontdisturb' type="checkbox" />
                <label className="dont-disturb-button edit-list-label__dont-disturbe-btn" for="dontdisturb">Don`t
                    disturb
                </label>
            </li>
        </ul> */}
        <footer className="edit-footer edit-list-label__footer">
            <button onClick = {onDeleteList} className="edit-list-label__delete-todo-list">
                <BsTrash className="edit-list-label__icon" />
            </button>
            <button onClick = {goBack} className = 'edit-list-label__results-btns edit-list-label__results-btn_cancel'>Cancel</button>
            <button 
                className = "edit-list-label__results-btns edit-list-label__results-btn_done"
                onClick = {renameHandlerByClick}
            >Done!</button>
        </footer>
    </div>
    )
}