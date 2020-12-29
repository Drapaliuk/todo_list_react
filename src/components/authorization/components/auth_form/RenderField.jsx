import React from 'react'


export const RenderField = ({input, meta, ...attributes}) => {
    const {touched, invalid, error} = meta;
    const isInvalid = touched && invalid;
    const [isVisibleMessage, setVisibleMessage] = React.useState(false);
    const onShowInvalidMessage = () => setVisibleMessage(!isVisibleMessage)


    return  (<div class="login__input-wrapper">
        <label for="login-password">
            <svg class="icon">
                <use href="./src/img/sprite.svg#icon-lock"></use>
            </svg>
        </label>
        <input className="login__passsword" {...input} {...attributes} />

        {
            isVisibleMessage || isInvalid &&
            <div class="login__valid-message">
                <div class="triangle-right"></div>
                <div class="triangle-down"></div>
                {error.message}
            </div>
        }
        {
            isInvalid &&
            <button onClick = {onShowInvalidMessage} class="authorization__show-invalid-message">
                error
                {/* <svg class="authorization__invalid-icon">
                    <use href="#icon-warning-sign"></use>
                </svg> */}
            </button>
        }
    </div>)
}