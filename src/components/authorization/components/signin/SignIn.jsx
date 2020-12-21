import React from 'react'

export function SignIn() {
return (
<div class="registration">
    <div class="registration__icon-background">
        <svg class="icon__registration">
            <use href="./src/img/sprite.svg#icon-user-empty-fill"></use>
        </svg>
    </div>
    <h2 class="registration__header">Registration</h2>
    <form class="registration__form">
        <div class="registration__input-wrapper registration__valid-data">
            <label for="registration-login">
                <svg class="icon">
                    <use href="./src/img/sprite.svg#icon-user"></use>
                </svg>
            </label>
            <input class="registration__login" id='registration-login' type="text" placeholder="login" />
        </div>
        <div class="registration__input-wrapper registration__invalid-data">
            <label for="registration-password">
                <svg class="icon">
                    <use href="./src/img/sprite.svg#icon-lock"></use>
                </svg>
            </label>
            <input class="registration__passsword" id='registration-password' type="password" placeholder="password" />
            <div class="registration__valid-message">
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
        <div class="registration__btn-wrapper">
            <button class="registration__btn-done">Sign In</button>
        </div>
    </form>
</div>
)
}