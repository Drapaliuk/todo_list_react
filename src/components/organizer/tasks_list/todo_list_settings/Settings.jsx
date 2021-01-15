import React from 'react'
import { GoMute } from 'react-icons/go';
import { AiOutlinePicture } from 'react-icons/ai';
import { SettingsOption } from './SettingsOption';

export function Settings() {
    return (
        <ul className="options">
            <SettingsOption value = 'Don`t disturbe' Icon = {GoMute} />
            <SettingsOption value = 'Theme of list' Icon = {AiOutlinePicture} />
        </ul>
    )
}

