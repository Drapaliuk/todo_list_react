import React from 'react'
import { OpenPartButton } from '../open_setting_part_btn/OpenPartButton';
import { GrUserSettings } from 'react-icons/gr';
import { BirthDayItem } from './BirthDayItem';
import { SettingsItem } from '../settings_item/SettingsItem';
import { useDispatch, useSelector } from 'react-redux';
import { updateBiography } from '../../../redux/actions';
import { getUserBiography } from '../../../redux/selectors';







export function Biography({onOpen, isOpen}) {
    const dispatch = useDispatch()
    const {name, surname, country, birthday } = useSelector(state => getUserBiography(state));
    
    const onChangeName = newValue => dispatch(updateBiography({name: newValue}))
    const onChangeSurname = newValue => dispatch(updateBiography({surname: newValue}))
    const onChangeCountry = newValue => dispatch(updateBiography({country: newValue}))
    const onChangeBirthday = newValue => dispatch(updateBiography({birthday: newValue}))


    return (
        <li class="settings__part">
            <OpenPartButton onOpen = {onOpen} isOpen = {isOpen} Icon = {GrUserSettings} title = {'Biography'} />
            {isOpen && <ul class="settings__value-list">
                <SettingsItem onChange = {onChangeName} title = 'name' value = {name} placeholder = 'name' />
                <SettingsItem onChange = {onChangeSurname} title = 'surename' value = {surname} placeholder = 'surename' />
                <SettingsItem onChange = {onChangeCountry} title = 'country' value = {country} placeholder = 'country' />
                <BirthDayItem onChange = {onChangeBirthday} value = {birthday} />
            </ul>}
        </li>
    )
}