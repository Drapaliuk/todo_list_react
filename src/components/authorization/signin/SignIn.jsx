import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registration, setAuthError } from '../../../redux/actions';
import { getAuthData, getAuthError } from '../../../redux/selectors';
import { AuthForm } from '../auth_form/AuthForm';
import { serverErrorsMessages } from '../../../service/server_errors/server_errors';
import { AiOutlineClose, AiOutlineUserAdd } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

export function SignIn() {
    const dispatch = useDispatch();
    const {login, password} = useSelector(state => getAuthData(state));
    const serverError = useSelector(state => getAuthError(state));

    const onSubmit = () => dispatch(registration(login, password))
    const onClearAuthError = () => dispatch(setAuthError(''))

    return (
        <div class="registration">
            <div class="registration__icon-background">
                <AiOutlineUserAdd className = 'icon__login' />
            </div>
            <NavLink onClick = {onClearAuthError} className = 'auth__close-btn' to = '/'>
                <AiOutlineClose className = 'auth__close-icon' />
            </NavLink>
            <h2 class="registration__header">Registration</h2>
            <AuthForm onSubmit = {onSubmit}  />
            {
                serverError &&
                <div class="server-error-message">
                    {serverErrorsMessages.authorization[serverError].message}
                </div>

            }
        </div>
    )
}