import React from 'react'
import { SortingOption } from './SortingOption'
import { AiFillStar} from 'react-icons/ai';
import { BsCalendar, BsSearch } from 'react-icons/bs';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { SortingOrder } from './SortingOrder';
export function Sorting({sortByHandler, sortOrderHandler, currentSortCriteria, searchHandler}) {
    const {sortBy, order} = currentSortCriteria;

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

            <SortingOption  handler = {searchHandler({sortBy: 'searchByLetters', order: 'asc'})} 
                            title = 'Search task' 
                            Icon = {BsSearch} 
                            isActive = {sortBy === 'searchByLetters'} />

            <SortingOrder {...{sortOrderHandler, order, sortBy}} />
        </ul>

    )
}