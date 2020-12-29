import React from 'react'
import { useSelector } from 'react-redux';
import { getSelectedTaskId, isCreatedTasksLists } from '../../redux/selectors';
import {Bar, TodoList, FullInfo} from './components';
import classNames from 'classnames';
import IconUser from '../../assets/svg/User';

export function Application() {
const isSelectedTask = useSelector(state => getSelectedTaskId(state));
const isCreatedTasksListsValue = useSelector(state => isCreatedTasksLists(state))

return (
    <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
        <Bar isCreatedTasksLists = {isCreatedTasksListsValue} />
        <TodoList isCreatedTasksLists = {isCreatedTasksListsValue} />
        
        {isSelectedTask && <FullInfo />}
    </div>
)
}