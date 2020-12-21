import React from 'react'
import { NavLink } from 'react-router-dom'

export function Introduction() {
    return (
        <div class="introduction">
            <h1>Welcome to Wunderlist!</h1>
            <div class="introduction__btn-wrapper">
                <NavLink className = 'introduction__login-link' to = '/auth/login'>Login</NavLink>
                <NavLink className = 'introduction__login-link' to = '/auth/signin'>Login</NavLink>
                <NavLink className = 'introduction__login-link' to = '/auth/login'>Login</NavLink>
            </div>
        </div>
    )
}

