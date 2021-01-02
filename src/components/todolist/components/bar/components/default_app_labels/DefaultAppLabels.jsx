import React, { Fragment } from 'react'
import { defaultAppLists } from '../../../../../../service/default_app_tasks_list';

export function DefaultAppLabels({onSelectList}) {

    return (
        <Fragment>
            {
                defaultAppLists.map(({title, id, Icon}) => {
                    return (
                        <li onClick = {onSelectList(id, true)} class="bar-section__labels-list-item">
                            <div class="todo-list-label todo-list-label_without_correct_btn">
                            <Icon className="todo-list-label__icon" />
                            <span class="todo-list-label__name">{title} </span>
                            <span class="todo-list-label__task-amount">2</span>
                            </div>
                        </li>
                    )
                    
                })
            }
        </Fragment>

    )
}