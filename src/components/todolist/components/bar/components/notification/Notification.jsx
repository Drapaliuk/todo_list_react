import React from 'react'

export function Notification() {
return (
        <ul class="notification">
            <li class="notification__item">
                <button class="notification__btn">
                    some event
                </button>
                <button class="notification__delete">
                    <img src="./src/img/close-icon.png" alt=""/>
                </button>
            </li>
        </ul>
)
}