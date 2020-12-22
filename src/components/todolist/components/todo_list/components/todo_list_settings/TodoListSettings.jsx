import React from 'react'

export function TodoListSettings() {
    return (
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
    )
}
