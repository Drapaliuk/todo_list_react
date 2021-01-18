import React from 'react'
import { SortingOption } from './SortingOption'
import { AiFillStar} from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { SortingOrder } from './SortingOrder';
export function Sorting({sortByHandler, currentSortCriteria}) {
    const [sortBy, sortOrder] = currentSortCriteria.split('/')

    return (
        <ul className="options">
            <SortingOption  sortByHandler = {sortByHandler('text/asc')} 
                            title = 'Sort Alphabetically' 
                            Icon = {AiOutlineSortAscending} 
                            isActive = {sortBy === 'text'} />

            <SortingOption  sortByHandler = {sortByHandler('dateCreation/asc')} 
                            title = 'Sort by Creation Date' 
                            Icon = {BsCalendar} 
                            isActive = {sortBy === 'dateCreation'} />

            <SortingOption  sortByHandler = {sortByHandler('isImportant/asc')} 
                            title = 'Sort by Priority' 
                            Icon = {AiFillStar} 
                            isActive = {sortBy === 'isImportant'} />

            <SortingOrder {...{sortByHandler, sortOrder, sortBy}} />
        </ul>

    )
}






// const possibleSortedBy = [
//     {
//         sortBy: 'text/asc',
//         title: 'Sort Alphabetically',
//         icon: AiOutlineSortAscending
//     },
//     {
//         sortBy: 'dateCreation/asc',
//         title: 'Sort by Creation Date',
//         icon: BsCalendar
//     },
//     {
//         sortBy: 'isImportant/asc',
//         title: 'Sort by Priority',
//         icon: AiFillStar
//     },
// ]