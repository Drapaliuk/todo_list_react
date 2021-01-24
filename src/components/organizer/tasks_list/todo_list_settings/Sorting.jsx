import React from 'react'
import { SortingOption } from './SortingOption'
import { AiFillStar} from 'react-icons/ai';
import { BsCalendar, BsSearch } from 'react-icons/bs';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { SortingOrder } from './SortingOrder';
export function Sorting({sortByHandler, sortOrderHandler, currentSortCriteria, onVisibleSearchTaskInput}) {
    const {sortBy, order} = currentSortCriteria;
    const searchTaskHandler = () => {
        sortByHandler({sortBy: 'searchByLetters', order: 'asc'})()
        onVisibleSearchTaskInput()
    }

    return (
        <ul className="options">
            <SortingOption  handler = {sortByHandler({sortBy: 'text', order: 'asc'})} 
                            title = 'Sort Alphabetically' 
                            Icon = {AiOutlineSortAscending} 
                            isActive = {sortBy === 'text'} />

            <SortingOption  handler = {sortByHandler({sortBy: 'dateCreation', order: 'asc'})} 
                            title = 'Sort by Creation Date' 
                            Icon = {BsCalendar} 
                            isActive = {sortBy === 'dateCreation'} />

            <SortingOption  handler = {sortByHandler({sortBy: 'isImportant', order: 'asc'})} 
                            title = 'Sort by Priority' 
                            Icon = {AiFillStar} 
                            isActive = {sortBy === 'isImportant'} />

            <SortingOption  handler = {searchTaskHandler} 
                            title = 'Search task' 
                            Icon = {BsSearch} 
                            isActive = {sortBy === 'searchByLetters'} />

            <SortingOrder {...{sortOrderHandler, order, sortBy}} />
        </ul>

    )
}