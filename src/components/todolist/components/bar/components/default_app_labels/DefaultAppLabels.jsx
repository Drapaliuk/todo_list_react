import React, { Fragment } from 'react'
import { appListsData } from '../../../../../../service/default_app_tasks_list';

export function DefaultAppLabels({appListTaskAmounts, onSelectList}) {

    return (
        <Fragment>
            {
                appListsData.map(({title, id, Icon}) => {
                    return (
                        <li onClick = {onSelectList(id)} class="bar-section__labels-list-item">
                            <div class="todo-list-label todo-list-label_without_correct_btn">
                            <Icon className="todo-list-label__icon" />
                            <span class="todo-list-label__name">{title} </span>
                            <span class="todo-list-label__task-amount">{appListTaskAmounts[id]}</span>
                            </div>
                        </li>
                    )
                    
                })
            }
        </Fragment>

    )
}