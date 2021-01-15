import React from 'react';
import { Biography } from './biography/Biography';
import { ChangeLanguage } from './change_language/ChangeLanguage';
import { PersonalData } from './personal_data/PersonalData';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';



export function ProfileSettings() {
    const localState = {
                    state: {
                        biography: React.useState(false),
                        personalData: React.useState(false),
                        changeLanguage: React.useState(false)
                    },
                    openHandler: function(requestPart) {
                        return () => {
                            for(let key in this.state) {
                                const stateValue = this.state[key][0]
                                const setStateValue = this.state[key][1]
                                if(key === requestPart) {
                                    setStateValue(!stateValue)
                                    continue
                                }
                                setStateValue(false)
                            }
                        }
                       
                    },
                    getStateValue: function(requestPart) {
                        return this.state[requestPart][0]
                    }
                };

    return (

        <div class="settings settings_theme_dark">
            <NavLink to = '/app' class="settings__close-btn">
                <AiOutlineClose className = 'settings__icon' />
            </NavLink>
            <h2 class="settings__header">Settings</h2>
            <ul class="settings__parts-list">
                <Biography onOpen = {localState.openHandler('biography')} 
                           isOpen = {localState.getStateValue('biography')} />

                <PersonalData onOpen = {localState.openHandler('personalData')} 
                           isOpen = {localState.getStateValue('personalData')} />

                {/* <ChangeLanguage onOpen = {localState.openHandler('changeLanguage')} 
                           isOpen = {localState.getStateValue('changeLanguage')} /> */}
            </ul>
        </div>
    )
}