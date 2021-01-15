import React, { Fragment, useState } from 'react'
import { ChangePasswordItem } from './ChangePasswordItem'

export function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [doubleNewPassword, setDoubleNewPassword] = useState('')
    const [isVisibleOldPassword, setVisibleOldPassword] = useState(false)
    const [isVisibleNewPassword, setVisibleNewPassword] = useState(false)
    const [isVisibleDoubleNewPassword, setVisibleDoubleNewPassword] = useState(false)
    const [isCorrectionPassword, setCorrection] = useState(false)

    const correctionPasswordHandler = () => setCorrection(!isCorrectionPassword)

    return (
        <li class="settings__value-list-item">
                    <button onClick = {correctionPasswordHandler} class="settings__change-password-btn">Change password</button>
                    {
                        isCorrectionPassword &&
                        <Fragment>
                            <ChangePasswordItem value = {oldPassword} 
                                                placeholder = 'old password' 
                                                onChange = {setOldPassword}
                                                isVisible = {isVisibleOldPassword}
                                                setVisible = {setVisibleOldPassword}
                                                />

                            <ChangePasswordItem value = {newPassword} 
                                                placeholder = 'new password' 
                                                onChange = {setNewPassword}
                                                isVisible = {isVisibleNewPassword}
                                                setVisible = {setVisibleNewPassword}
                                                />

                            <ChangePasswordItem value = {doubleNewPassword} 
                                                placeholder = 'new password' 
                                                onChange = {setDoubleNewPassword}
                                                isVisible = {isVisibleDoubleNewPassword}
                                                setVisible = {setVisibleDoubleNewPassword}
                                                />
                        </Fragment>
                    }
                </li>
    )
}