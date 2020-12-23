import React from 'react'
import { NavLink } from 'react-router-dom'

export function Introduction() {
    return (
        <div class="authorization">
            <div class="introduction">
            <h1>Welcome to Wunderlist!</h1>
            <div class="introduction__btn-wrapper">
                <NavLink className = 'introduction__login-link' to = '/auth/login'>Login</NavLink>
                <NavLink className = 'introduction__login-link' to = '/auth/registration'>Registration</NavLink>
                <NavLink className = 'introduction__login-link' to = '/tasks'>Guest</NavLink>
            </div>
        </div>
        </div>
    )
}
