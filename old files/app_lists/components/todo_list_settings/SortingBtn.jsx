import React from 'react'
import classNames from 'classnames';

export function SortingBtn({Icon, value, visibleHandler, isVisible}) {
    return (
        <button onClick = {visibleHandler} 
                className= {classNames('todo-list-settings__part-btn', {'todo-list-settings__part-btn_active':isVisible})}>
            <Icon className="todo-list-settings__icon"/>
            {value}
        </button>
    )
}
