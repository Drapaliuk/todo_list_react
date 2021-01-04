import React from 'react'
import { BiPencil } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegSave } from 'react-icons/fa';

export function BiographyItem({title, value, placeholder}) {
    const [newValue, setNewValue] = React.useState(value);
    const [isCorrection, setCorrection] = React.useState(false);
    const newValueHandler = event => setNewValue(event.target.value)

    const correctionHandler = () => setCorrection(!isCorrection)

    return (
        <li class="settings__value-list-item">
            <div class="settings__value">
                <span class="settings__value-header">{title}:</span> <span
                    class="settings__changable-field">{value}</span>
                <button onClick = {correctionHandler} class="settings__change-value-btn">
                    {
                        isCorrection 
                        ?
                        <AiOutlineClose className="settings__icon_correct" />
                        :
                        <BiPencil className="settings__icon_correct" />
                    }
                </button>
            </div>
            
           {
            isCorrection 
                &&
            <div className = 'settings__change-value-wrapper'>
                <input onChange = {newValueHandler} 
                       value = {newValue} class="settings__change-value-input" 
                       type="text" placeholder={placeholder} />
                {
                    value !== newValue
                    &&
                    <button className="settings__save-btn">
                        <FaRegSave className="settings__save-icon" />
                    </button>
                }
               
            </div>
           }
        </li>
    )
}