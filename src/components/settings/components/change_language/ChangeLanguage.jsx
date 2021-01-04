import React from 'react';
import { OpenPartButton } from '../OpenPartButton';
import { GrLanguage } from 'react-icons/gr';



export function ChangeLanguage({onOpen, isOpen}) {

    return (
            <li class="settings__part">
                <OpenPartButton onOpen = {onOpen} isOpen = {isOpen} Icon = {GrLanguage} title = {'Language'} />
                {
                    isOpen &&
                    <div class="settings__value-list">
                        <div class="settings__value-list-item">
                            <div class="settings__selected-language">
                                Current select: English
                                <svg class="settings__icon_part_name settings__icon_selected_language">
                                    <use href="./src/img/sprite.svg#icon-united-kingdom"></use>
                                </svg>
                            </div>
                            <button class="settings__language-btn">
                                Ukraine
                                <svg class="settings__icon_language_btn">
                                    <use href="./src/img/sprite.svg#icon-ukraine"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                }
            </li>
    )
}