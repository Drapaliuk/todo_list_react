import React from 'react';
import classNames from 'classnames';
import { BiSun, BiMoon } from 'react-icons/bi';
import { BsMoon } from 'react-icons/bs';


export function ThemeSwitcher({currentTheme, onThemeChange}) {
    let newTheme = currentTheme === 'light' ? 'dark' : 'light'
    const themeChangeHandler = () => onThemeChange(newTheme)

    return (
        <button className = 'theme-switcher' onClick = {themeChangeHandler} >
            <BsMoon className = 'theme-switcher_icon' />  
            <BiSun className = 'theme-switcher_icon theme-switcher_icon_sun' />
            <span className = {classNames('theme-switcher__toggler', {'theme-switcher__toggler_on': currentTheme === 'dark'})}></span>
        </button>
    )
}

