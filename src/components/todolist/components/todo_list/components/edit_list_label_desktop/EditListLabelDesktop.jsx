import React from 'react'

export function EditListLabelDesktop() {
    return (
        <div className="edit-list-label edit-list-label_theme-dark">
        <h2 className="edit-list-label__header">Edit list</h2>
        <input className='new-edited-name edit-list-label__new-name' type="text" placeholder="new list name" />
        <ul className="edit-list-options edit-list-label__options-list">
            <li className="edit-list-option edit-list-label__options-list-item">
                <input className="edit-list-label__dont-disturbe-input" id='dontdisturb' type="checkbox" />
                <label className="dont-disturb-button edit-list-label__dont-disturbe-btn" for="dontdisturb">Don`t
                    disturb</label>
            </li>
        </ul>

        <footer className="edit-footer edit-list-label__footer">
            <button className="edit-list-label__delete-todo-list">
                <svg className="edit-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-delete"></use>
                </svg>
            </button>
            <button className="edit-list-label__results-btns edit-list-label__results-btn_cancel">Cancel</button>
            <button className="edit-list-label__results-btns edit-list-label__results-btn_done">Done</button>
        </footer>
    </div>
    )
}