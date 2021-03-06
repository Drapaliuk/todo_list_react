import React from 'react'


export const renderFieldCreator = () => ({input, meta, ...attributes}) => {
    const {touched, error} = meta;
    const isInvalid = touched && error;
    const [isVisibleMessage, setVisibleMessage] = React.useState(false);
    const [isVisibleMessageSwitch, setVisibleMessageSwitch] = React.useState(false);
    const onSwitchMessage = () => setVisibleMessage(!isVisibleMessage)
    
   



    return  (<div class="login__input-wrapper">
        <label for="login-password">
            <svg class="icon">
                <use href="./src/img/sprite.svg#icon-lock"></use>
            </svg>
        </label>
        <input className="login__passsword" {...input} {...attributes} />

        {
            isVisibleMessage &&
            <div class="login__valid-message">
                <div class="triangle-right"></div>
                <div class="triangle-down"></div>
                Пароль має бути не менше 6 символів
            </div>

            
        }
        {
            isVisibleMessageSwitch &&
            <button onClick = {onSwitchMessage} class="authorization__show-invalid-message">
                error
                {/* <svg class="authorization__invalid-icon">
                    <use href="#icon-warning-sign"></use>
                </svg> */}
            </button>
        }
        
        
    </div>)
}