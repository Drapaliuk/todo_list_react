import React from 'react'

function Settings() {
return (
<div class="settings settings_theme_dark">
    <button class="settings__close-btn">
        <svg class="settings__icon">
            <use href="./src/img/sprite.svg#icon-cancel"></use>
        </svg>
    </button>
    <h2 class="settings__header">Settings</h2>
    <ul class="settings__parts-list">
        <li class="settings__part">
            <button class="settings__part-btn">
                <span class="settings__part-name-wrapper">
                    <svg class="settings__icon_part_name">
                        <use href="./src/img/sprite.svg#icon-user"></use>
                    </svg>
                    <span class="settings__part-name">Profile</span>
                </span>
                <svg class="settings__icon_open-status">
                    <use href="./src/img/sprite.svg#icon-down-arrow"></use>
                    <use href="./src/img/sprite.svg#icon-up-arrow"></use>
                </svg>
            </button>
            <ul class="settings__value-list">
                <li class="settings__value-list-item">
                    <div class="settings__value">
                        <span class="settings__value-header">Name:</span> <span
                            class="settings__changable-field">Vitalii</span>
                        <button class="settings__change-value-btn">
                            <svg class="settings__icon_correct">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                    <input class="settings__change-value-input" type="text" placeholder="name" />
                </li>
                <li class="settings__value-list-item">
                    <div class="settings__value">
                        <span class="settings__value-header">Surename:</span> <span
                            class="settings__changable-field">Drapaliuk</span>
                        <button class="settings__change-value-btn">
                            <svg class="settings__icon_correct">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                    <input class="settings__change-value-input" type="text" placeholder="surename" />
                </li>
                <li class="settings__value-list-item">
                    <div class="settings__value">
                        <span class="settings__value-header">Country:</span> <span
                            class="settings__changable-field">Ukraine</span>
                        <button class="settings__change-value-btn">
                            <svg class="settings__icon_correct">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                    <input class="settings__change-value-input" type="text" placeholder="country" />
                </li>
                <li class="settings__value-list-item">
                    <div class="settings__value">
                        <span class="settings__value-header">Birthday:</span> <span
                            class="settings__changable-field">16.02.1993</span>
                        <button class="settings__change-value-btn">
                            <svg class="settings__icon_correct">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                    <input class="settings__change-value-input" type="text" placeholder="birthday" />
                </li>
            </ul>
        </li>
        <li class="settings__part">
            <button class="settings__part-btn">
                <span class="settings__part-name-wrapper">
                    <svg class="settings__icon_part_name">
                        <use href="./src/img/sprite.svg#icon-key"></use>
                    </svg>
                    <span class="settings__part-name">Security</span>
                </span>
                <svg class="settings__icon_open-status">
                    <use href="./src/img/sprite.svg#icon-down-arrow"></use>
                    <use href="./src/img/sprite.svg#icon-up-arrow"></use>
                </svg>
            </button>
            <ul class="settings__value-list">
                <li class="settings__value-list-item">
                    <button class="settings__change-password-btn">Change password</button>
                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="old password" />

                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="new password" />

                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="new password" />

                </li>
                <li class="settings__value-list-item">
                    <div class="settings__value">
                        <span class="settings__value-header">Phone:</span> <span
                            class="settings__changable-field">+380689308684</span>
                        <button class="settings__change-value-btn">
                            <svg class="settings__icon_correct">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="old phone" />
                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="new phone" />
                </li>
                <li class="settings__value-list-item">
                    <div class="settings__value">
                        <span class="settings__value-header">Email:</span> <span
                            class="settings__changable-field">vitaliidrapaliuk</span>
                        <button class="settings__change-value-btn">
                            <svg class="settings__icon_correct">
                                <use href="./src/img/sprite.svg#icon-pen"></use>
                            </svg>
                        </button>
                    </div>
                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="old email" />
                    <input class="settings__change-value-input settings__change-value-input_security_parts" type="text"
                        placeholder="new email" />
                </li>
            </ul>
        </li>
        <li class="settings__part">
            <button class="settings__part-btn">
                <span class="settings__part-name-wrapper">
                    <svg class="settings__icon_part_name">
                        <use href="./src/img/sprite.svg#icon-translation"></use>
                    </svg>
                    <span class="settings__part-name">Language</span>
                </span>
                <svg class="settings__icon_open-status">
                    <use href="./src/img/sprite.svg#icon-down-arrow"></use>
                    <use href="./src/img/sprite.svg#icon-up-arrow"></use>
                </svg>
            </button>
            <ul class="settings__value-list">
                <li class="settings__value-list-item">
                    <div class="settings__selected-language">
                        English
                        <svg class="settings__icon_part_name settings__icon_selected_language">
                            <use href="./src/img/sprite.svg#icon-united-kingdom"></use>
                        </svg>
                    </div>
                    <button class="settings__language-btn">
                        Ukraine
                        <svg class="settings__icon_language_btn">
                            <use href="./src/img/sprite.svg#icon-ukraine"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </li>
    </ul>
</div>
)
}

export default Settings