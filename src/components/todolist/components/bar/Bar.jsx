import React from 'react'

export function Bar() {
return (
<section class="bar-section bar-section_theme_dark">
    <header>
        <button class="user-photo">
            <img src="./src/img/logo.jpg" alt="user photo" />
        </button>
        <div>
            <button class="settings-btn">
                <svg class="icon icon-settings">
                    <use href="./src/img/sprite.svg#icon-settings"></use>
                </svg>
            </button>
            <button class="bell">
                <svg class="icon icon--notification">
                    <use href="./src/img/sprite.svg#icon-notification"></use>
                </svg>
            </button>
        </div>
    </header>
    {/* <ul class="notification">
        <li class="notification__item">
            <button class="notification__btn">
                some event
            </button>
            <button class="notification__delete">
                <img src="./src/img/close-icon.png" alt="">
            </button>
        </li>
    </ul> */}
    <ul class="bar-section__labels-list">
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_without_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-calendar_color"></use>
                </svg>
                <span class="todo-list-label__name">Today </span>
                <span class="todo-list-label__task-amount">2</span>
            </div>

        </li>
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-week"></use>
                </svg>
                <span class="todo-list-label__name">Week </span>
                <span class="todo-list-label__task-amount">2</span>
            </div>

        </li>
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label">
                <svg class="todo-list-label__icon bar-section__icon_star_active">
                    <use href="./src/img/sprite.svg#icon-star"></use>
                </svg>
                <span class="todo-list-label__name">Important </span>
                <span class="todo-list-label__task-amount">2</span>
            </div>
        </li>
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div class="todo-lists-folder todo-list-label">
                <svg class="todo-lists-folder__icon todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-folder"></use>
                </svg>
                <input class="todo-lists-folder__create-new" type="text" placeholder="folder name" />
            </div>
        </li>
        <li class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div class="todo-lists-folder todo-list-label todo-list-label_with_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-folder"></use>
                </svg>
                <span class="folder name">Some folder</span>
                <button class="todo-list-label__correct-btn">
                    <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg>
                </button>
            </div>
            <ul class=" todo-lists-folder__inner-list">
                <li class="bar-section__labels-list-item">
                    <div class="todo-list-label todo-list-label_with_correct_btn">
                        <svg class="todo-list-label__icon">
                            <use href="./src/img/sprite.svg#icon-clipboard"></use>
                        </svg>
                        <span class="todo-list-label__name">Warnings </span>
                        <span class="todo-list-label__task-amount">3</span>
                        <button class="todo-list-label__correct-btn">
                            <svg class="todo-list-label__icon">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                </li>
            </ul>
        </li>
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_with_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-clipboard"></use>
                </svg>
                <span class="todo-list-label__name">Warnings </span>
                <span class="todo-list-label__task-amount">3</span>
                <button class="todo-list-label__correct-btn">
                    <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg>
                </button>
            </div>

            {/* <ul class="bar-section__edit-todo-list-menu">
                <li class="bar-section__edit-todo-list-menu-item">
                    <button class="todo-list-settings-option todo-list-settings-option_theme_dark">
                        <svg class="todo-list-settings-option__icon">
                            <use href="./src/img/sprite.svg#icon-mute"></use>
                        </svg>
                        <span class="todo-list-settings-option__text">Don`t disturbe
                            <span
                                class="todo-list-settings-option__disturb-status todo-list-settings-option__disturb-status_on">on</span>
                        </span>
                    </button>
                </li>
                <li class="bar-section__edit-todo-list-menu-item">
                    <button class="todo-list-settings-option todo-list-settings-option_theme_dark">
                        <svg class="todo-list-settings-option__icon">
                            <use href="./src/img/sprite.svg#icon-pen"></use>
                        </svg>
                        <span class="todo-list-settings-option__text">Rename </span>
                    </button>
                </li>
                <li class="bar-section__edit-todo-list-menu-item">
                    <button class="todo-list-settings-option todo-list-settings-option_theme_dark">
                        <svg class="todo-list-settings-option__icon">
                            <use href="./src/img/sprite.svg#icon-delete"></use>
                        </svg>
                        <span class="todo-list-settings-option__text">Delete </span>
                    </button>
                </li>
            </ul> */}
        </li>
        <li class="bar-section__labels-list-item">
            <div class="todo-list-label todo-list-label_with_correct_btn">
                <svg class="todo-list-label__icon">
                    <use href="./src/img/sprite.svg#icon-clipboard"></use>
                </svg>
                <span class="todo-list-label__name">Warnings </span>
                <span class="todo-list-label__task-amount">3</span>
                <button class="todo-list-label__correct-btn">
                    <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg>
                </button>
            </div>
        </li>
    </ul>
    <button class="bar-section__add-new-folder-btn">+</button>
</section>
)
}