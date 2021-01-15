import React from 'react'


export const RenderField = ({input, meta, ...attributes}) => {
    const {touched, invalid, error, visited} = meta;
    const isInvalid = touched && error;
    const [isVisibleMessage, setVisibleMessage] = React.useState(false);
    const [isVisibleMessageSwitch, setVisibleMessageSwitch] = React.useState(false);
    const onSwitchMessage = () => setVisibleMessage(!isVisibleMessage)
    
    if(isInvalid) {
        // setVisibleMessageSwitch(true)
    }

    return  (
    <div className="check-code__input-wrapper check-code__valid-data">
        <label for="check-code-password">
            <svg className="icon">
                <use href="./src/img/sprite.svg#icon-key"></use>
            </svg>
        </label>
        <input className="check-code__check-code" {...input} {...attributes} />
        <button className="authorization__show-invalid-message">
            <svg className="authorization__invalid-icon">
                <use href="./src/img/sprite.svg#icon-warning-sign"></use>
            </svg>
        </button>
    </div>
)
}