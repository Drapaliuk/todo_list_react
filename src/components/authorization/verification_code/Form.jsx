import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { minLength, required } from '../../../utils';
import {RenderField} from './RenderField';

const validators = [required, minLength];

const component = props => {
    const {handleSubmit} = props;
    return (
        <form onSubmit = {handleSubmit} class="check-code__form">
            <Field name = 'verificationCode' type = 'text' component = {RenderField} placeholder = 'code' validate = {validators}/>
            <div class="check-code__btn-wrapper">
                <button class="check-code__btn-done">Check</button>
            </div>
        </form>
    )
}

export const Form = reduxForm({
    form: 'restorePasswordCode'
})(component)