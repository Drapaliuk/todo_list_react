import React from 'react';
import {SettingsOption} from './SettingsOption'
import {GoMute} from 'react-icons/go';
import {AiOutlinePicture, AiFillStar} from 'react-icons/ai';
import {BsCalendar, BsThreeDots} from 'react-icons/bs';
import {BiSortAZ, BiSort} from 'react-icons/bi';
// import {} from 'react-icons/';
// import {} from 'react-icons/';
// import {} from 'react-icons/';


export function TodoListSettings() {
    const [isVisibleSorting, setVisibleSorting] = React.useState(false);
    const [isVisibleSettings, setVisibleSettings] = React.useState(false);
    
    const onVisibleSorting = () => {
        setVisibleSorting(!isVisibleSorting)
        setVisibleSettings(false)
    }

    const onVisibleSettings = () => {
        setVisibleSettings(!isVisibleSettings)
        setVisibleSorting(false)
    }

    
    return (
        <div className="todo-list-settings">

        {
            isVisibleSettings &&
            <ul className="options">
                <SettingsOption value = 'Don`t disturbe' Icon = {GoMute} />
                <SettingsOption value = 'Theme of list' Icon = {AiOutlinePicture} />
            </ul>
        }
        {
            isVisibleSorting &&
            <ul className="options">
                <SettingsOption value = 'Sort Alphabetically' Icon = {BiSortAZ} />
                <SettingsOption value = 'Sort bt Creation Date' Icon = {BsCalendar} />
                <SettingsOption value = 'Sort by Priority' Icon = {AiFillStar} />
            </ul>
        }
        <div className="todo-list-settings__panel todo-list-settings__panel_theme_dark">
            <button onClick = {onVisibleSorting} className="todo-list-settings__part-btn">
                <BiSort className="todo-list-settings__icon"/>
                sort
            </button>
            <button onClick = {onVisibleSettings} className="todo-list-settings__part-btn todo-list-settings__part-btn_active">
                <BsThreeDots className="todo-list-settings__icon"/>
                more
            </button>
        </div>
    </div>
    )
}







{/* <li className="todo-list-settings__item">
<button className="todo-list-settings-option todo-list-settings-option_theme_dark">
    <svg className="todo-list-settings-option__icon">
        <use href="./src/img/sprite.svg#icon-mute"></use>
    </svg>
    <span className="todo-list-settings-option__text">Don`t disturbe
        <span
            className="todo-list-settings-option__disturb-status todo-list-settings-option__disturb-status_on">on</span>
    </span>
</button>
</li> */}