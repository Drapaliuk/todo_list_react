import React from 'react'
import {BsTrash} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { clearSelectedList, deleteTasksList } from '../../../../../../redux/actions/tasks/tasks';
import { getSelectedListId } from '../../../../../../redux/selectors'
export function EditListLabelDesktop() {
    const dispatch = useDispatch();
    const selectedListId = useSelector(state => getSelectedListId(state));
    // const selectedListName = useSelector(state => getSelectedListName(state));
    const [newName, setNewName] = React.useState('')

    const onDeleteList = () => dispatch(deleteTasksList(selectedListId));
    const onClearSelectedList = () => dispatch(clearSelectedList());
    if(!selectedListId) {
        return <Redirect to = '/tasks' />
    }

    return (
        <div className="edit-list-label edit-list-label_theme-dark">
        <h2 className="edit-list-label__header">Edit: {'a'}</h2>
        <input className='new-edited-name edit-list-label__new-name' 
               type="text" 
               placeholder="new list name"
               value = {newName}
               onChange = {event => setNewName(event.target.value)}
               
         />
        <ul className="edit-list-options edit-list-label__options-list">
            <li className="edit-list-option edit-list-label__options-list-item">
                <input className="edit-list-label__dont-disturbe-input" id='dontdisturb' type="checkbox" />
                <label className="dont-disturb-button edit-list-label__dont-disturbe-btn" for="dontdisturb">Don`t
                    disturb
                </label>
            </li>
        </ul>
        <footer className="edit-footer edit-list-label__footer">
            <button onClick = {onDeleteList} className="edit-list-label__delete-todo-list">
                <BsTrash className="edit-list-label__icon" />
            </button>
            <button onClick = {onClearSelectedList} className = 'edit-list-label__results-btns edit-list-label__results-btn_cancel'>Cancel</button>
            <button onClick = {onClearSelectedList} className = "edit-list-label__results-btns edit-list-label__results-btn_done">Done</button>
        </footer>
    </div>
    )
}