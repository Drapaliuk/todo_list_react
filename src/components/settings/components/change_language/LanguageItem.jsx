import React from 'react'

export function LanguageItem({code, title, onChange, Icon}) {
    const changeHandler = () => onChange(code)
    return (
        <button onClick = {changeHandler} class="settings__language-btn">
            {title}
            <Icon className="settings__icon_language_btn" />
        </button>
    )
}

