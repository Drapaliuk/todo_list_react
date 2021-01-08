import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../../../redux/actions';
import { getAuthData, getAuthError } from '../../../../redux/selectors';
import { AuthForm } from '../auth_form/AuthForm';
import Sprite from '../../../../assets/sprite/Sprite';
import {BiUser} from 'react-icons/bi'
import IconUser from '../../../../assets/svg/User';
import { serverErrorsMessages } from '../../../../service/server_errors/server_errors';

export function SignIn() {
    const dispatch = useDispatch();
    const {login, password} = useSelector(state => getAuthData(state));
    const serverError = useSelector(state => getAuthError(state));

    const onSubmit = () => dispatch(registration(login, password))

    return (
        <div class="registration">
            <div class="registration__icon-background">
            </div>
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