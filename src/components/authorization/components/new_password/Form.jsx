import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { minLength, required } from '../../../../utils';
import {RenderField} from './RenderField';

const validators = [required, minLength];

const component = props => {
    const {handleSubmit} = props;
    return (
        <form onSubmit = {handleSubmit} class="restore__form">
            <Field name = 'login' type = 'password' component = {RenderField} placeholder = 'new password' validate = {validators}/>
            <Field name = 'login' type = 'password' component = {RenderField} placeholder = 'new password' validate = {validators}/>
            
            <div class="restore__btn-wrapper">
                <button class="restore__btn-done">Change</button>
            </div>
        </form>

    )
}

export const Form = reduxForm({
    form: 'auth'
})(component)