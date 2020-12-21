import React from 'react'

export function TodoLists() {
    return (
        <section className="todo-section todo-section_theme_dark">
    <header>
        <button className="back-page-btn">
            <img src="./src/img/left-arrow.png" alt="" />
        </button>
        <div>
            <button className="settings-btn">
                <img src="./src/img/settings.png" alt="settings-icon" />
            </button>
            <button className="bell">
                <img src="./src/img/bell.png" alt="notification" />
            </button>
        </div>
    </header>

    <input className="add-todo add-todo_theme_dark" type="text" placeholder="+ Add todo" />


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
    <ul className="todo-list">
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox" />
                <div className="todo__text">Todo text</div>
                <button className="pin-btn pin-btn_todo pin-btn_active">
                    <svg className="pin-btn__icon">
                        <use href="./src/img/sprite.svg#icon-paper-push-pin"></use>
                    </svg>
                </button>
                <button className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <svg className="importantly-btn__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                </button>
            </div>
        </li>
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox" />
                <div className="todo__text">Todo text</div>
                <button className="pin-btn pin-btn_todo pin-btn_active">
                    <svg className="pin-btn__icon">
                        <use href="./src/img/sprite.svg#icon-paper-push-pin"></use>
                    </svg>
                </button>
                <button className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <svg className="importantly-btn__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                </button>
            </div>
        </li>
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox" />
                <div className="todo__text">Todo text</div>
                <button className="pin-btn pin-btn_todo">
                    <svg className="pin-btn__icon">
                        <use href="./src/img/sprite.svg#icon-paper-push-pin"></use>
                    </svg>
                </button>
                <button className="importantly-btn importantly-btn_todo">
                    <svg className="importantly-btn__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                </button>
            </div>


        </li>
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">Todo text</div>
                <button className="pin-btn pin-btn_todo pin-btn_active">
                    <svg className="pin-btn__icon">
                        <use href="./src/img/sprite.svg#icon-paper-push-pin"></use>
                    </svg>
                </button>
                <button className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <svg className="importantly-btn__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                </button>
            </div>
        </li>
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">Todo text</div>
                <button className="pin-btn pin-btn_todo pin-btn_active">
                    <svg className="pin-btn__icon">
                        <use href="./src/img/sprite.svg#icon-paper-push-pin"></use>
                    </svg>
                </button>
                <button className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <svg className="importantly-btn__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                </button>
            </div>
        </li>
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">Todo text</div>
                <button className="pin-btn pin-btn_todo pin-btn_active">
                    <svg className="pin-btn__icon">
                        <use href="./src/img/sprite.svg#icon-paper-push-pin"></use>
                    </svg>
                </button>
                <button className="importantly-btn importantly-btn_todo importantly-btn_active">
                    <svg className="importantly-btn__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                </button>
            </div>
        </li>
    </ul>
    <div className="visible-completed-todo visible-completed-todo_theme_dark">
        <button className="visible-completed-todo__btn">completed item</button>
        <svg className="visible-completed-todo__icon">
            <use href="./src/img/sprite.svg#icon-eye"></use>
        </svg>
        <svg className="icon">
            <use href="./src/img/sprite.svg#icon-eye-blocked"></use>
        </svg>
    </div>
    <ul className="todo-list">
        <li className="todo-list__item">
            <div className="todo todo_theme_dark todo_completed">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">Todo text</div>
            </div>
        </li>
        <li className="todo-list__item">
            <div className="todo todo_theme_dark todo_completed">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">Todo text</div>
            </div>
        </li>
    </ul>
    <div className="todo-list-settings">
        <ul className="options">
            <li className="todo-list-settings__item">
                <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                    <svg className="todo-list-settings-option__icon">
                        <use href="./src/img/sprite.svg#icon-mute"></use>
                    </svg>
                    <span className="todo-list-settings-option__text">Don`t disturbe
                        <span
                            className="todo-list-settings-option__disturb-status todo-list-settings-option__disturb-status_on">on</span>
                    </span>
                </button>
            </li>
            <li className="todo-list-settings__item">
                <button
                    className="todo-list-settings-option todo-list-settings-option_theme_dark todo-list-settings-option_active">
                    <svg className="todo-list-settings-option__icon">
                        <use href="./src/img/sprite.svg#icon-image"></use>
                    </svg>
                    <span className="todo-list-settings-option__text">Theme of list</span>
                </button>
            </li>
            <li className="todo-list-settings__item">
                <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                    <svg className="todo-list-settings-option__icon">
                        <use href="./src/img/sprite.svg#icon-descendant"></use>
                    </svg>
                    <span className="todo-list-settings-option__text">Sort Alphabetically</span>
                </button>
            </li>
            <li className="todo-list-settings__item">
                <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                    <svg className="todo-list-settings-option__icon">
                        <use href="./src/img/sprite.svg#icon-calendara_bw"></use>
                    </svg>
                    <span className="todo-list-settings-option__text">Sort by Due Date</span>
                </button>
            </li>
            <li className="todo-list-settings__item">
                <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                    <svg className="todo-list-settings-option__icon">
                        <use href="./src/img/sprite.svg#icon-wall-clock"></use>
                    </svg>
                    <span className="todo-list-settings-option__text">Sort bt Creation Date</span>
                </button>
            </li>
            <li className="todo-list-settings__item">
                <button className="todo-list-settings-option todo-list-settings-option_theme_dark">
                    <svg className="todo-list-settings-option__icon">
                        <use href="./src/img/sprite.svg#icon-star"></use>
                    </svg>
                    <span className="todo-list-settings-option__text">Sort by Priority</span>
                </button>
            </li>
        </ul>
        <div className="todo-list-settings__panel todo-list-settings__panel_theme_dark">
            <button className="todo-list-settings__part-btn">
                <svg className="todo-list-settings__icon">
                    <use href="./src/img/sprite.svg#icon-descendant"></use>
                </svg>
                sort
            </button>
            <button className="todo-list-settings__part-btn todo-list-settings__part-btn_active">
                <svg className="todo-list-settings__icon">
                    <use href="./src/img/sprite.svg#icon-more"></use>
                </svg>
                more
            </button>
        </div>
    </div>
</section>
    )
}