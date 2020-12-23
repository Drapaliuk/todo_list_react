import React from 'react'
import { NavLink } from 'react-router-dom'
import { AuthForm } from '../auth_form/AuthForm'

export function Login() {

    const onSubmit = () => console.log('submit from log in')


return (
<div class="login">
    <div class="login__icon-background">
        <svg class="icon__login">
            <use href=""></use>
        </svg>
    </div>
    <h2 class="login__header">Log in</h2>
    <AuthForm onSubmit = {onSubmit} />
    <div class="login__service-panel">
        <div class="login__remember-me">
            <input onChange = {(e) => console.log(e.target.checked)} id="remember_me" type="checkbox" />
            <label for="remember_me">Remember me</label>
        </div>
        <NavLink to='/auth/verification' className = "login__forgot-password">Forgot Password</NavLink>
    </div>
    <p class="login__register-link">Don`t have account?
        <NavLink to='/auth/registration'>REGISTER HERE</NavLink>
    </p>
</div>
)
}