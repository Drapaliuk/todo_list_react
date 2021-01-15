import React from 'react'
import { availableLanguages } from './available_languages'


export function SelectedLanguage({selectedLanguage}) {
    const {title, Icon} = availableLanguages.find(lang => lang.code === selectedLanguage)

    return (
        <div class="settings__selected-language">
            Current select: {title}
            <Icon className="settings__icon_part_name settings__icon_selected_language" />
        </div>
    )
}

