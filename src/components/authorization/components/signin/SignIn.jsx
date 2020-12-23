import React from 'react'
import { AuthForm } from '../auth_form/AuthForm'

export function SignIn() {

const onSubmit = () => console.log('submit from sign in')

return (
<div class="registration">
    <div class="registration__icon-background">
        <svg class="icon__registration">
            <use href="./src/img/sprite.svg#icon-user-empty-fill"></use>
        </svg>
    </div>
    <h2 class="registration__header">Registration</h2>
    <AuthForm onSubmit = {onSubmit}  />
</div>
)
}