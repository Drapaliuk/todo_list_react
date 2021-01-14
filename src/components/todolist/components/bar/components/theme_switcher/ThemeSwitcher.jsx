import React from 'react';
import classNames from 'classnames';
import { BiSun } from 'react-icons/bi';
import { BsMoon } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../../../../../redux/actions';


export function ThemeSwitcher() {
    const dispatch = useDispatch()
    const onThemeChange = newValue => dispatch(updateSettings({theme: newValue}))
    const currentTheme = useSelector(state => state.settings.theme);

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

