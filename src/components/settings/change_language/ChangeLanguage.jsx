import React from 'react';
import { OpenPartButton } from '../open_setting_part_btn/OpenPartButton';
import { GrLanguage } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageItem } from './LanguageItem';
import { availableLanguages } from './available_languages';
import { updateSettings } from '../../../redux/actions';
import { getProfileSettings } from '../../../redux/selectors';
import { SelectedLanguage } from './SelectedLanguage';

export function ChangeLanguage({onOpen, isOpen}) {
    const dispatch = useDispatch();
    const {language: selectedLanguage} = useSelector(state => getProfileSettings(state))
    const onChangeLanguage = langCode => dispatch(updateSettings({language: langCode}))

    return (
            <li class="settings__part">
                <OpenPartButton onOpen = {onOpen} isOpen = {isOpen} Icon = {GrLanguage} title = {'Language'} />
                {
                    isOpen &&
                    <div class="settings__value-list">
                        <div class="settings__value-list-item">
                          <SelectedLanguage selectedLanguage = {selectedLanguage} />
                          {availableLanguages.map(language => {
                              if(language.code !== selectedLanguage) {
                                return <LanguageItem {...language} onChange = {onChangeLanguage} />
                              }
                          })}
                        </div>
                    </div>
                }
            </li>
    )
}