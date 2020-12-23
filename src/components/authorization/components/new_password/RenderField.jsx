import React from 'react'

export const RenderField = ({input, meta, ...attributes}) => {
    const {touched, invalid, error, visited} = meta;
    const isInvalid = touched && error;
    const [isVisibleMessage, setVisibleMessage] = React.useState(false);
    const [isVisibleMessageSwitch, setVisibleMessageSwitch] = React.useState(false);
    const onSwitchMessage = () => setVisibleMessage(!isVisibleMessage)
    console.log('isInvalid', isInvalid)
    
    if(isInvalid) {
        // setVisibleMessageSwitch(true)
    }

    return  (
    <div class="restore__input-wrapper restore__invalid-data">
        <label for="restore-password">
            <svg class="icon">
                <use href="./src/img/sprite.svg#icon-key"></use>
            </svg>
        </label>
        <input class="restore__password" id='restore-password' type="password"
            placeholder="new password" />
        <div class="restore__valid-message">
            <div class="triangle-right"></div>
            <div class="triangle-down"></div>
            Пароль має бути не менше 6 символів
        </div>
        <button class="authorization__show-invalid-message">
            <svg class="authorization__invalid-icon">
                <use href="./src/img/sprite.svg#icon-warning-sign"></use>
            </svg>
        </button>
    </div>
)
}


            