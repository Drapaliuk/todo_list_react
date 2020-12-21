import React from 'react'

export function FullInfo() {
return (
<div class="todo-full-info todo-full-info_theme_dark desktop">
    <div class="todo-full-text">
        <input type="checkbox" class="todo-full-text__check-input-todo" />
        <textarea class="todo-full-text__text" name="" placeholder="fulltext"></textarea>
        <button class="todo-full-text__importantly-btn importantly-btn importantly-btn_todo importantly-btn_active">
            <svg class="todo-full-text__icon importantly-btn__icon">
                <use href="./src/img/sprite.svg#icon-star"></use>
            </svg>
        </button>
    </div>

    <div class="todo-additional-option">
        <ul class="todo-additional-option__time-options">
            <li class="todo-additional-option__time-options-item">
                <div class="todo-due-date todo-remind">
                    <svg class="todo-due-date__icon todo-remind__icon">
                        <use href="./src/img/sprite.svg#icon-calendara_bw"></use>
                    </svg>
                    <input class="todo-due-date__input todo-remind__input" placeholder="Встановити термін" />

                    <button class="delete-btn delete-btn_todo_time_option">
                        <svg class="delete-btn__icon">
                            <use href="./src/img/sprite.svg#icon-cancel"></use>
                        </svg>
                    </button>
                </div>
            </li>

            <li class="todo-additional-option__time-options-item">
                <div class="todo-remind">
                    <svg class="todo-remind__icon">
                        <use href="./src/img/sprite.svg#icon-alarm-clock"></use>
                    </svg>
                    <input class="todo-remind__input" placeholder="Нагадати" />
                    <button class="delete-btn delete-btn_todo_time_option">
                        <svg class="delete-btn__icon">
                            <use href="./src/img/sprite.svg#icon-cancel"></use>
                        </svg>
                    </button>
                </div>
            </li>
        </ul>




        <div class="todo-subtasks">
            <form class="todo-subtasks__add-form">
                <button class="todo-subtasks__add-form-btn" type="submit">+</button>
                <input class="todo-subtasks__add-form-input" type="text" placeholder="add subtask" />
            </form>
            <ul class="todo-subtasks__list">
                <li class="todo-subtasks__list-item">
                    <div class="todo-subtask">
                        <input class="todo-subtask__check-input-subtask" type="checkbox" />
                        <span class="todo-subtask__text">Some subtask</span>
                        <button class="delete-btn delete-btn_todo_subtask">
                            <svg class="delete-btn__icon">
                                <use href="./src/img/sprite.svg#icon-cancel"></use>
                            </svg>
                        </button>
                    </div>

                </li>
                <li class="todo-subtasks__list-item">
                    <div class="todo-subtask">
                        <input class="todo-subtask__check-input-subtask" type="checkbox" />
                        <span class="todo-subtask__text">Some subtask</span>
                        <button class="delete-btn delete-btn_todo_subtask">
                            <svg class="delete-btn__icon">
                                <use href="./src/img/sprite.svg#icon-cancel"></use>
                            </svg>
                        </button>
                    </div>
                </li>
            </ul>
        </div>

        <textarea class="todo-note" name="" id="" cols="30" rows="10" placeholder="Add note"></textarea>

        <ul class="todo-comments-list">
            <li class="todo-comments-list__item">
                <div class="todo-comment">
                    <span class="todo-comment__text">Some comment</span>
                    <button class="delete-btn delete-btn_todo_subtask">
                        <svg class="delete-btn__icon">
                            <use href="./src/img/sprite.svg#icon-cancel"></use>
                        </svg>
                    </button>
                </div>
            </li>
            <li class="todo-comments-list__item">
                <div class="todo-comment">
                    <span class="todo-comment__text">Some comment</span>
                    <button class="delete-btn delete-btn_todo_subtask">
                        <svg class="delete-btn__icon">
                            <use href="./src/img/sprite.svg#icon-cancel"></use>
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>


    <div class="todo-full-info__manipulation-wrapper">
        <form class="add-comment-form">
            <input class="add-comment-form__input" type="text" placeholder="Add comment..." />
            <button class="add-comment-form__btn">Add</button>
        </form>
        <div class="todo-full-info__manipulations">
            <button class="todo-full-info__close-btn">
                <svg class="todo-full-info-icon">
                    <use href="./src/img/sprite.svg#icon-arrow-right"></use>
                </svg>
            </button>
            <p class="creted-by">created yesterday by me</p>
            <button class="todo-full-info__close-btn todo-full-info__delete-todo">
                <svg class="todo-full-info-icon">
                    <use href="./src/img/sprite.svg#icon-delete"></use>
                </svg>
            </button>
        </div>
    </div>
</div>
)
}