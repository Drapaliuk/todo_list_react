import React from 'react'
import { NavLink } from 'react-router-dom'
import Sprite from '../../../../assets/sprite/Sprite'


export function Login() {
return (
<div class="login">
    <div class="login__icon-background">
        <svg class="icon__login">
            <use href=""></use>
        </svg>
    </div>
    <h2 class="login__header">Log in</h2>
    <form class="login__form">
        <div class="login__input-wrapper login__valid-data">
            <label for="login-login">
                <svg class="icon">
                    <use href="#icon-user"></use>

                </svg>
            </label>
            <input class="login__login" id='login-login' type="text" placeholder="login" />
        </div>
        <div class="login__input-wrapper login__invalid-data">
            <label for="login-password">
                <svg class="icon">
                    <use href="./src/img/sprite.svg#icon-lock"></use>
                </svg>
            </label>
            <input class="login__passsword" id='login-password' type="password" placeholder="password" />
            <div class="login__valid-message">
                <div class="triangle-right"></div>
                <div class="triangle-down"></div>
                Пароль має бути не менше 6 символів
            </div>
            <button class="authorization__show-invalid-message">
                <svg class="authorization__invalid-icon">
                    <use href="#icon-warning-sign"></use>
                </svg>
            </button>
        </div>
        <div class="login__btn-wrapper">
            <button class="login__btn-done">Sign In</button>
        </div>
    </form>
    <div class="login__service-panel">
        <div class="login__remember-me">
            <input id="remember_me" type="checkbox" />
            <label for="remember_me">Remember me</label>
        </div>
        <NavLink to='/auth/restore' className = "login__forgot-password">Forgot Password</NavLink>
    </div>
    <p class="login__register-link">Don`t have account?
        <NavLink to='/auth/registration'>REGISTER HERE</NavLink>
    </p>
</div>
)
}