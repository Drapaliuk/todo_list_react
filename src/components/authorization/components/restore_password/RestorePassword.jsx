import React from 'react'

export function RestorePassword() {
    return (
        <div class="restore">
                <a href="#" class="restore__cancel">
                    <svg class="icon--small-size">
                        <use href="./src/img/sprite.svg#icon-cancel"></use>
                    </svg>
                </a>
                <div class="restore__icon-background">
                    <svg class="icon__restore">
                        <use href="./src/img/sprite.svg#icon-user-empty-fill"></use>
                    </svg>
                </div>
                <h2 class="restore__header">Restore</h2>
                <form class="restore__form">
                    <div class="restore__input-wrapper restore__invalid-data">
                        <label for="restore-password">
                            <svg class="icon">
                                <use href="./src/img/sprite.svg#icon-key"></use>
                            </svg>
                        </label>
                        <input class="restore__password" id='restore-password' type="password"
                            placeholder="new password" />
                        <div class="restore__valid-message">
                            <div class="triangle-right"></div>
                            <div class="triangle-down"></div>
                            Пароль має бути не менше 6 символів
                        </div>
                        <button class="authorization__show-invalid-message">
                            <svg class="authorization__invalid-icon">
                                <use href="./src/img/sprite.svg#icon-warning-sign"></use>
                            </svg>
                        </button>
                    </div>
                    <div class="restore__input-wrapper restore__invalid-data">
                        <label for="restore-password">
                            <svg class="icon">
                                <use href="./src/img/sprite.svg#icon-key"></use>
                            </svg>
                        </label>
                        <input class="restore__password" id='restore-password' type="password"
                            placeholder="new password" />
                        <div class="restore__valid-message">
                            <div class="triangle-right"></div>
                            Пароль має бути не менше 6 символів
                        </div>
                    </div>
                    <div class="restore__btn-wrapper">
                        <button class="restore__btn-done">Change</button>
                    </div>
                </form>
            </div>
    )
}