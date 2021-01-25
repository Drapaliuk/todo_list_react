import React from 'react'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BsCheckBox, BsFileText } from 'react-icons/bs';
import { RiArrowUpLine, RiCloseLine, RiFilterLine } from 'react-icons/ri';
import { VscSearch, VscSearchStop } from 'react-icons/vsc';
import { DESC, ASC } from '../../../../service';



export function SubtasksSettings({setCurrentSortCriteria, currentSortCriteria, visibleSubtasksListHandler}) {
    const [isVisibleSorting, setVisibleSubtasksSorting] = React.useState(false); 
    const [isVisibleSearchInput, setVisibleSearchInput] = React.useState(false);
    const visibleSubtasksSortingHandler = () => setVisibleSubtasksSorting(!isVisibleSorting);
    const visibleSearchInputHandler = () => setVisibleSearchInput(!isVisibleSearchInput);
    const inVisibleSearchInputHandler = () => setVisibleSearchInput(false);
    const onChangeSortBy = newSortBy => () => setCurrentSortCriteria(prevState => ({...prevState, ...newSortBy}))
    const onChangeSortOrder = () => {
        if(currentSortCriteria.order === ASC) {
            return setCurrentSortCriteria((prevState => ({...prevState, ...{order: DESC}})))
        }
        return setCurrentSortCriteria((prevState => ({...prevState, ...{order: ASC}})))
    }

    return (
        <li className = 'subtasks__settings-options'>
            {
                isVisibleSorting && !isVisibleSearchInput &&
                <div className = 'subtasks__sort-by'>
                    <button onClick = {onChangeSortOrder} className="subtasks__sort-by-item">
                        <AiOutlineSortAscending className = 'subtasks__settings-icon' />
                    </button>
                    <button onClick = {onChangeSortBy({sortBy: 'text'})} className="subtasks__sort-by-item">
                        <BsFileText className = 'subtasks__settings-icon' />
                    </button>
                    <button onClick = {onChangeSortBy({sortBy: 'hasDone'})} className="subtasks__sort-by-item">
                        <BsCheckBox className = 'subtasks__settings-icon' />
                    </button>
                    <button onClick = {visibleSearchInputHandler} className="subtasks__sort-by-item">
                        <VscSearch className = 'subtasks__settings-icon' />
                    </button>
                </div>
                
            }
            {
                isVisibleSearchInput &&
                <div className = 'subtasks__search-wrapper'>
                    <button onClick = {inVisibleSearchInputHandler} className = 'subtasks__search-stop'>
                        <VscSearchStop className = 'subtasks__settings-icon' />
                    </button>
                    <input value = {currentSortCriteria.searchByLetters} onChange = {e => onChangeSortBy({sortBy: 'searchByLetters', searchByLetters: e.target.value })() } className = 'subtasks__search-input' placeholder = 'search' />
                </div>
            }

            <div className = 'subtasks__option-container'>
                <button className = 'subtasks__settings-option'>
                    <RiArrowUpLine className = 'subtasks__settings-icon' />
                </button>
                <button onClick = {visibleSubtasksSortingHandler} className = 'subtasks__settings-option'>
                    <RiFilterLine className = 'subtasks__settings-icon' />
                </button>
                <button className = 'subtasks__settings-option' onClick = {visibleSubtasksListHandler}>
                    <RiCloseLine className = 'subtasks__settings-icon' />
                </button>
            </div>
                    </li>
    )
}

