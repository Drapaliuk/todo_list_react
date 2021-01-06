import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { minLength, required } from '../../../../utils';
import {RenderField} from './RenderField';

const validators = [required, minLength];

const component = props => {
    const {handleSubmit} = props;
    return (
        <form onSubmit = {handleSubmit} class="login__form">
            <Field name = 'login' type = 'text' component = {RenderField} placeholder = 'login' validate = {validators}/>
            <Field name = 'password' type = 'password' component = {RenderField} placeholder = 'password' validate = {validators} />
            <div class="login__btn-wrapper">
                <button class="login__btn-done">Sign In</button>
            </div>
        </form>
    )
}

export const AuthForm = reduxForm({
    form: 'auth'
})(component)