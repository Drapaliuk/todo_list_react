import React from 'react'
import { OpenPartButton } from '../open_setting_part_btn/OpenPartButton';
import { GrUserAdmin } from 'react-icons/gr';
import { ChangePassword } from './ChangePassword';
import { SettingsItem } from '../settings_item/SettingsItem';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalData } from '../../../redux/actions';
import { getUserPersonalData } from '../../../redux/selectors';
export function PersonalData({onOpen, isOpen}) {
    const dispatch = useDispatch()
    const {email, phone} = useSelector(state => getUserPersonalData(state))

    const onChangePhone = newValue => dispatch(updatePersonalData({phone: newValue}))
    const onChangeEmail = newValue => dispatch(updatePersonalData({email: newValue}))


    return (
        <li class="settings__part">
            <OpenPartButton onOpen = {onOpen} isOpen = {isOpen} Icon = {GrUserAdmin} title = {'Personal data'} />
            {
                isOpen &&
                <ul class="settings__value-list">
                    <ChangePassword />
                    <SettingsItem onChange = {onChangeEmail} title = 'Email' value = {email} />
                    <SettingsItem onChange = {onChangePhone} title = 'Phone' value = {phone} />
            </ul>
            }
        </li>
    )
}