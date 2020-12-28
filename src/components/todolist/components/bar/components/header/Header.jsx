import React from 'react'

export function Header({onLogOut}) {
    return (
        <header>
        <button class="user-photo">
            <img src="./src/img/logo.jpg" alt="user photo" />
        </button>
        <button onClick = {() => onLogOut()}>logout</button>
        <div>
            <button class="settings-btn">
                <svg class="icon icon-settings">
                    <use href="./src/img/sprite.svg#icon-settings"></use>
                </svg>
            </button>
            <button class="bell">
                <svg class="icon icon--notification">
                    <use href="./src/img/sprite.svg#icon-notification"></use>
                </svg>
            </button>
        </div>
    </header>
    )
}

