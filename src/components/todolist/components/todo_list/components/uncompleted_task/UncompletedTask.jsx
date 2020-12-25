import React from 'react'

export function UncompletedTask({text}) {
    return (
        <li className="todo-list__item">
            <div className="todo todo_theme_dark">
                <input className="todo__check-input" type="checkbox"/>
                <div className="todo__text">{text}</div>
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
    )
}

