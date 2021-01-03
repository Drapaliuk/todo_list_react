import React from 'react'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { BiLogOut } from 'react-icons/bi';

export function Header({onLogOut, onThemeChange, currentTheme}) {
    return (
        <header>
        <button class="user-photo">
            <img src="./src/img/logo.jpg" alt="user photo" />
        </button>
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
        <ThemeSwitcher onThemeChange = {onThemeChange} currentTheme = {currentTheme}/>
        <button className = 'logout-btn' onClick = {() => onLogOut()}><BiLogOut className = 'logout-btn__icon' /></button>
    </header>
    )
}

