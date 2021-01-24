import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr';

export function SearchTaskByLettersInput({onSearchByLetters, onVisibleSearchTaskInput, currentSearchTaskPattern}) {
    const onCloseSearchInput = () => onVisibleSearchTaskInput()
    const writeTextHandler = e =>  onSearchByLetters(e.target.value)
    
    return (
        <div className = 'search-task-by-letters'>
            <BsSearch className = 'search-task-by-letters__icon-search' />
            <input value = {currentSearchTaskPattern} onChange = {writeTextHandler} className = 'search-task-by-letters__input' type="text"/>
            <button onClick = {onCloseSearchInput} className = 'search-task-by-letters__btn-cancel'>
                <GrClose className = 'search-task-by-letters__icon-cancel' />
            </button>
        </div>
    )
}