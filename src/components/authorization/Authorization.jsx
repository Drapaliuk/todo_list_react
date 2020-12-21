import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import {Introduction, Login, SignIn, SelectLanguage, RestorePassword, VerificationCode} from './components'
export function Authorization() {
    
    return (
        <div class="authorization">
            <SelectLanguage />
            {/* <NavLink to = '/' /> */}
            <Route exact path = '/auth/introduction' component = { Introduction } />
            <Route exact path = '/auth/login' component = { Login } />
            <Route exact path = '/auth/registration' component = { SignIn } />
            <Route exact path = '/auth/restore' component = { RestorePassword } />
            <Route exact path = '/auth/verification' component = { VerificationCode } />

        </div>

    )
}