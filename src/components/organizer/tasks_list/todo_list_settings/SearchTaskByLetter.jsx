import React from 'react'
import { BsSearch } from 'react-icons/bs'

export function SearchTaskByLetters() {
    const [text, writeText] = React.useState('')
    const writeTextHandler = e => writeText(e.value)
    return (
        <div className = 'search-task-by-letters'>
            <BsSearch className = 'search-task-by-letters__icon' />
            <input value = {text} onChange = {writeTextHandler} className = 'search-task-by-letters__input' type="text"/>
        </div>
    )
}