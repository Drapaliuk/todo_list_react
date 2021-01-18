import React from 'react'
import { ThemeSwitcher } from '../../../common';
import { BiLogOut } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';

export function Header({onLogOut, onThemeChange, currentTheme}) {
    return (
        <header>
            <NavLink to = '/app/settings'>
                <IoSettingsOutline className = 'icon icon-settings' />
            </NavLink>
            <ThemeSwitcher onThemeChange = {onThemeChange} currentTheme = {currentTheme}/>
            <NavLink to = '/' className = 'logout-btn' onClick = {() => onLogOut()}><BiLogOut className = 'logout-btn__icon' /></NavLink>
        </header> 
    )
}

