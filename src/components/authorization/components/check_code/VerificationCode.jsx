import React from 'react';
import { NavLink } from 'react-router-dom';


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
                <form class="check-code__form">
                    <div class="check-code__input-wrapper check-code__valid-data">
                        <label for="check-code-password">
                            <svg class="icon">
                                <use href="./src/img/sprite.svg#icon-key"></use>
                            </svg>
                        </label>
                        <input class="check-code__check-code" id='check-code-password' type="password" placeholder="code"/>
                        <button class="authorization__show-invalid-message">
                            <svg class="authorization__invalid-icon">
                                <use href="./src/img/sprite.svg#icon-warning-sign"></use>
                            </svg>
                        </button>
                    </div>
                    <div class="check-code__btn-wrapper">
                        <button class="check-code__btn-done">Check</button>
                    </div>
                </form>
                <NavLink to = '/auth/registration' className = 'check-code__register-link'>REGISTER HERE</NavLink>
            </div>
    )
}