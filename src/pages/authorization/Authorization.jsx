import React from 'react'
import { Route } from 'react-router-dom'
import {Introduction, Login, SignIn, NewPassword, VerificationCode} from '../../components'
export function Authorization() {
    
    return (
        <div class="authorization">
            <Route exact path = '/auth/introduction' component = { Introduction } />
            <Route exact path = '/auth/login' component = { Login } />
            <Route exact path = '/auth/registration' component = { SignIn } />
            <Route exact path = '/auth/restore' component = { NewPassword } />
            <Route exact path = '/auth/verification' component = { VerificationCode } />
            <Route exact path = '/auth/newPassword' component = {NewPassword} />
        </div>
    )
}