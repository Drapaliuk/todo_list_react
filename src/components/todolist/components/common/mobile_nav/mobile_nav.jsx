import React from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { ThemeSwitcher } from '../../bar/components';

export function MobileNav({partName}) {
    const {goBack} = useHistory()
    const goBackHandler = () => goBack()
    return (
        <nav className = 'mobile-nav'>
            <button onClick = {goBackHandler} className = 'mobile-nav__btn'>
                <IoMdArrowBack className = 'mobile-nav__icon' />
            </button>
            <h2 className = 'mobile-nav__title'>{partName}</h2>
            <ThemeSwitcher />
        </nav>
    )
}