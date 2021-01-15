import React from 'react'
import { BsEye,  BsEyeSlash} from 'react-icons/bs';


export function ChangePasswordItem({placeholder, onChange, value, isVisible, setVisible}) {
    const writePasswordHandler = event => onChange(event.target.value);
    
    return (
        <div className = 'settings__change-value-wrapper'>
            <input  class="settings__change-value-input settings__change-value-input_security_parts" 
                onChange = {writePasswordHandler}
                type= {isVisible ? 'text' : 'password'}
                value = {value}
                placeholder={placeholder} />

                <button className = 'settings__save-btn' onClick = {() => setVisible(!isVisible)}>
                    {isVisible ?  <BsEye className = 'settings__save-icon' /> : <BsEyeSlash className = 'settings__save-icon' />}
                </button>
        </div>
    )
}
