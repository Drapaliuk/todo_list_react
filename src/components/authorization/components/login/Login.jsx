import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AuthForm } from '../auth_form/AuthForm'
import {getAuthData, getAuthError} from '../../../../redux/selectors';
import { login } from '../../../../redux/actions';
import { serverErrorsMessages } from '../../../../service/server_errors/server_errors';
import { AiOutlineClose, AiOutlineUserSwitch } from 'react-icons/ai';

export function Login() {
    const authData = useSelector(state => getAuthData(state));
    const serverError = useSelector(state => getAuthError(state));

    const dispatch = useDispatch();
    const onSubmit = () => dispatch(login(authData))

    return (
        <div class="login">
            <div class="login__icon-background">
                <AiOutlineUserSwitch className = 'icon__login' />
            </div>
            <NavLink className = 'auth__close-btn' to = '/'>
                <AiOutlineClose className = 'auth__close-icon' />
            </NavLink>

            <h2 class="login__header">Log in</h2>
            <AuthForm onSubmit = {onSubmit} />
            {
                serverError &&
                <div class="server-error-message">
                    {serverErrorsMessages.authorization[serverError].message}
                </div>

            }
            <div class="login__service-panel">
                <div class="login__remember-me">
                    <input id="remember_me" type="checkbox" />
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