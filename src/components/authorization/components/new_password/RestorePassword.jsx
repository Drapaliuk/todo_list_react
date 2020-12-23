import React from 'react'
import { Form } from './Form'

export function NewPassword() {
    return (
        <div class="restore">
                <a href="#" class="restore__cancel">
                    <svg class="icon--small-size">
                        <use href="./src/img/sprite.svg#icon-cancel"></use>
                    </svg>
                </a>
                <div class="restore__icon-background">
                    <svg class="icon__restore">
                        <use href="./src/img/sprite.svg#icon-user-empty-fill"></use>
                    </svg>
                </div>
                <h2 class="restore__header">Restore</h2>
                <Form />
            </div>
    )
}