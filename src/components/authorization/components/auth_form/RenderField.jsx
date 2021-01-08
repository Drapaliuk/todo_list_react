import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FaExclamation } from 'react-icons/fa';

export const RenderField = ({input, meta, ...attributes}) => {
    const {touched, invalid, error} = meta;
    
    const isInvalid = touched && invalid;
    const [isVisibleErrorMessage, setVisibleErrorMessage] = React.useState(false);
    const onShowInvalidMessage = () => setVisibleErrorMessage(!isVisibleErrorMessage)
 


    return  (<div class="login__input-wrapper">
        <label for="login-password">
            <BiUser class="icon" />
        </label>
        <input className="login__passsword" {...input} {...attributes} />
        {attributes.serverError}

        {
            isVisibleErrorMessage || isInvalid &&
            <div class="login__valid-message">
                <div class="triangle-right"></div>
                <div class="triangle-down"></div>
                {error.message}
            </div>
        }
        {
            isInvalid &&
            <button onClick = {onShowInvalidMessage} class="authorization__show-invalid-message">
                <FaExclamation className="authorization__invalid-icon" />
            </button>
        }
    </div>)
}