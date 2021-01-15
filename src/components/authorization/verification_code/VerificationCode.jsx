import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form } from './Form';


export function VerificationCode() {
    return (
         <div class="check-code">
                <a href="#" class="check-code__cancel">
                    <svg class="icon--small-size">
                        <use href="./src/img/sprite.svg#icon-cancel"></use>
                    </svg>
                </a>
                <div class="check-code__icon-background">
                    <svg class="icon__check-code">
                        <use href="./src/img/sprite.svg#icon-unlocked"></use>
                        <use href="./src/img/sprite.svg#icon-lock"></use>
                    </svg>                    
                </div>
                <h2 class="check-code__header">Verification code</h2>
                <Form />
                <NavLink to = '/auth/registration' className = 'check-code__register-link'>REGISTER HERE</NavLink>
            </div>
    )
}