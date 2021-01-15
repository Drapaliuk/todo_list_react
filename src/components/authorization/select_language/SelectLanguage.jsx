import React from 'react'

export function SelectLanguage() {
return (
<div class="authorization-languages">
    <div class="authorization-languages__selected-languages">
        <button class="authorization-languages__btn">
            <span class="authorization-languages__btn-text">eng</span>
            <svg class="authorization-languages__icon">
                <use href="./src/img/sprite.svg#icon-united-kingdom"></use>
            </svg>
        </button>

    </div>
    <ul class="authorization-languages__list">
        <li class="authorization-languages__language">
            <button class="authorization-languages__btn">
                <span class="authorization-languages__btn-text">ukr</span>
                <svg class="authorization-languages__icon">
                    <use href="./src/img/sprite.svg#icon-ukraine"></use>
                </svg>
            </button>
        </li>
    </ul>
</div>
)
}