import React from 'react'
import { OpenPartButton } from '../OpenPartButton';
import { GrUserAdmin } from 'react-icons/gr';
import { ChangePassword } from './ChangePassword';
import { SettingsItem } from '../SettingsItem';
export function PersonalData({onOpen, isOpen}) {
    return (
        <li class="settings__part">
            <OpenPartButton onOpen = {onOpen} isOpen = {isOpen} Icon = {GrUserAdmin} title = {'Personal data'} />
            {
                isOpen &&
                <ul class="settings__value-list">
                    <ChangePassword />
                    <SettingsItem title = 'Email' value = 'vitaliidrapaliuk@gmail.com' />
                    <SettingsItem title = 'Phone' value = '+380689308684' />
                
            </ul>
            }
        </li>
    )
}