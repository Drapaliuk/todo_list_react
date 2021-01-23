import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr';

export function SearchTaskByLetters() {
    const [text, writeText] = React.useState('')
    const writeTextHandler = e => writeText(e.value)
    return (
        <div className = 'search-task-by-letters'>
            <BsSearch className = 'search-task-by-letters__icon-search' />
            <input value = {text} onChange = {writeTextHandler} className = 'search-task-by-letters__input' type="text"/>
            <button className = 'search-task-by-letters__btn-cancel'>
                <GrClose className = 'search-task-by-letters__icon-cancel' />
            </button>
        </div>
    )
}