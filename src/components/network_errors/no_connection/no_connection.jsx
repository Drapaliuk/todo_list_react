import React from 'react'
import { RiWifiOffLine } from 'react-icons/ri'

export function NoConnection() {
    return (
        <div className = "authorization">
            <div className = 'not-network__wrapper'>
                <RiWifiOffLine className = 'not-network__icon' />
                <h1 className = 'not-network__message'>There are not network connection!</h1>
                <div>
                Waiting to reconnection!
                </div>
            </div>
        </div>
    )
}