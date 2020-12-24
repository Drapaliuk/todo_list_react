import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../../../redux/actions';
import { getAuthData } from '../../../../redux/selectors';
import { AuthForm } from '../auth_form/AuthForm';
import Sprite from '../../../../assets/sprite/Sprite';
import {BiUser} from 'react-icons/bi'
import IconUser from '../../../../assets/svg/User';

export function SignIn() {
    const dispatch = useDispatch();
    const {login, password} = useSelector(state => getAuthData(state));

    const onSubmit = () => dispatch(registration(login, password))

    return (
        <div class="registration">
            <div class="registration__icon-background">
                {/* <svg class="icon__registration">
                    <use href="./src/img/sprite.svg#icon-user-empty-fill"></use>
                </svg> */}
                <IconUser />
            </div>
            <h2 class="registration__header">Registration</h2>
            <AuthForm onSubmit = {onSubmit}  />
        </div>
    )
}