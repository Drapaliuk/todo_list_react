import React from 'react'
import { SortingOption } from './SortingOption';
import {GrDescend, GrAscend} from 'react-icons/gr'

export function SortingOrder({sortOrderHandler, order, sortBy}) {
    const isOrderAscend = order === 'asc';
    const title = order === 'asc' ? 'ascending' : 'descending'
    const newOrder = isOrderAscend ? 'desc' : 'asc'
    return (
        <SortingOption handler = {sortOrderHandler(sortBy, newOrder)} 
                       title = {`Order: ${title}`} 
                       Icon = {order === 'desc' ? GrDescend : GrAscend} />
    )
}