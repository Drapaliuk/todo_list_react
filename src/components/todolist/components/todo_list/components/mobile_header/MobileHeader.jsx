import React from 'react'

export function MobileHeader() {
    return (
        <header>
        <button className="back-page-btn">
            <img src="./src/img/left-arrow.png" alt="" />
        </button>
        <div>
            <button className="settings-btn">
                <img src="./src/img/settings.png" alt="settings-icon" />
            </button>
            <button className="bell">
                <img src="./src/img/bell.png" alt="notification" />
            </button>
        </div>
    </header>
    )
}
