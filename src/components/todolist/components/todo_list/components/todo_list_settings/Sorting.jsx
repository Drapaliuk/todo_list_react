import React from 'react'
import { SortingOption } from './SortingOption'
import { AiFillStar} from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';
import { BiSortAZ } from 'react-icons/bi';

export function Sorting({sortByHandler, currentSortBy}) {
    const possibleSortedBy = [
        {
            sortBy: 'text',
            title: 'Sort Alphabetically',
            icon: BiSortAZ
        },
        {
            sortBy: 'dateCreation',
            title: 'Sort bt Creation Date',
            icon: BsCalendar

        },
        {
            sortBy: 'isImportant',
            title: 'Sort by Priority',
            icon: AiFillStar

        }
    ]

    return (
        <ul className="options">
            {
                possibleSortedBy.map(({sortBy, title, icon}) => {
                    return <SortingOption sortByHandler = {sortByHandler(sortBy)} 
                                          title = {title} 
                                          Icon = {icon} 
                                          isActive = {currentSortBy === sortBy} />
                })
            }
        </ul>

    )
}

