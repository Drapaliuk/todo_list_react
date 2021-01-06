import React from 'react'
import { ThemeSwitcher } from '../theme_switcher/ThemeSwitcher';
import { BiLogOut } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';

export function Header({onLogOut, onThemeChange, currentTheme}) {
    return (
        <header>
        <NavLink to = '/lists/settings'>
            <IoSettingsOutline className = 'icon icon-settings' />
        </NavLink>
        <div>
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

