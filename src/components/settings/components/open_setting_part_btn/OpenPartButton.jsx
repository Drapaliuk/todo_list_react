import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export function OpenPartButton({onOpen, isOpen, Icon, title}) {
    const openHandler = () => onOpen()

    return (
        <button onClick = {openHandler} class="settings__part-btn">
            <span class="settings__part-name-wrapper">
                <Icon className = 'settings__icon_part_name' />
                <span class="settings__part-name">{title}</span>
            </span>
            {
                isOpen ?
                <MdKeyboardArrowUp className="settings__icon_open-status" />
                :
                <MdKeyboardArrowDown className="settings__icon_open-status" />
            }
        </button>
    )
}