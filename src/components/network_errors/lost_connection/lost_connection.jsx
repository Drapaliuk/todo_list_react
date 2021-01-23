import React from 'react'
import { RiWifiOffLine } from 'react-icons/ri'

export function LostConnection() {
    return (
        <div className = 'network-lost__message-wrapper'>
            <RiWifiOffLine className = 'network-lost__icon' /> <span className = 'network-lost__message'>Network connection has been lost!</span>
        </div>
    )
}

