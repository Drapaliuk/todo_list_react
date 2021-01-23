import React from 'react'

export function InitializePreloader() {
    return (
        <div className = "authorization">
            <div class="preloader-container">
                <div class="dash uno"></div>
                <div class="dash dos"></div>
                <div class="dash tres"></div>
                <div class="dash cuatro"></div>
            </div>
            <div className = 'preloader-title'>
                Loading...
            </div>
        </div>
    )
}

