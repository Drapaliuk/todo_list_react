import React from 'react';
import { BiSort} from 'react-icons/bi';
import { SortingBtn } from './SortingBtn';
import { SortingOption } from './SortingOption';
import { AiFillStar} from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';
import { AiOutlineSortAscending } from 'react-icons/ai';
import {GrDescend, GrAscend} from 'react-icons/gr'



export function AppListSorting({onSortTasks, currentSortCriteria, onSortOrder, currentSortOrder}) {
    const [isVisibleSorting, setVisibleSorting] = React.useState(false);
    const onVisibleSorting = () => setVisibleSorting(!isVisibleSorting)

    const isOrderAscend = currentSortOrder === 'asc';
    const order = isOrderAscend ? 'desc' : 'asc'
    const title = currentSortOrder === 'asc' ? 'ascending' : 'descending'


    const sortByHandler = sortBy => () => {
        if(sortBy === currentSortCriteria) return onSortTasks('')
        onSortTasks(sortBy)
    }


    const sortOrderHandler = () => onSortOrder(order)

    return (
        <div className="todo-list-settings">
            {
                isVisibleSorting && 
                <ul className="options">
                    <SortingOption  sortByHandler = {sortByHandler('text')} 
                                    title = 'Sort Alphabetically' 
                                    Icon = {AiOutlineSortAscending} 
                                    isActive = {currentSortCriteria === 'text'} />

                    <SortingOption  sortByHandler = {sortByHandler('dateCreation')} 
                                    title = 'Sort by Creation Date' 
                                    Icon = {BsCalendar} 
                                    isActive = {currentSortCriteria === 'dateCreation'} />

                    <SortingOption  sortByHandler = {sortByHandler('isImportant')} 
                                    title = 'Sort by Priority' 
                                    Icon = {AiFillStar} 
                                    isActive = {currentSortCriteria === 'isImportant'} />

                    <SortingOption sortByHandler = {sortOrderHandler} 
                                   title = {`Order: ${title}`} 
                                   Icon = {currentSortOrder === 'desc' ? GrDescend : GrAscend} />
                </ul>
            }
            <div className="todo-list-settings__panel todo-list-settings__panel_theme_dark">
                <SortingBtn value = 'sort' 
                            Icon = {BiSort} 
                            visibleHandler = {onVisibleSorting} 
                            isVisible = {isVisibleSorting} />
                              
            </div>
    </div>
    )
}