import React from 'react'
import { SortingOption } from './SortingOption';
import {GrDescend, GrAscend} from 'react-icons/gr'

export function SortingOrder({sortByHandler, sortOrder, sortBy}) {
    const isOrderAscend = sortOrder === 'asc';
    const order = isOrderAscend ? `${sortBy}/desc` : `${sortBy}/asc`
    const title = sortOrder === 'asc' ? 'ascending' : 'descending'

    return (
        <SortingOption sortByHandler = {sortByHandler(order)} 
                       title = {`Order: ${title}`} 
                       Icon = {sortOrder === 'desc' ? GrDescend : GrAscend} />
    )
}