import React from 'react'
import { CgSmileSad } from 'react-icons/cg'

export function NotFoundTasks({currentSearchTaskPattern}) {
    return (
        <div className = 'hasnt-found-tasks'>
            <CgSmileSad className = 'hasnt-found-tasks__icon' />
            <div className = 'hasnt-found-tasks__message'>Hasn't found tasks by search request:   </div>
            <div className = 'hasnt-found-tasks__search-request'>{currentSearchTaskPattern}</div>
        </div>
    )
}


