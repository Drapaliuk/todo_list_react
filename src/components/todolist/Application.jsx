import React from 'react'
import { useSelector } from 'react-redux';
import { getSelectedTaskId, getSelectedTaskProperty, getTasksLists, isCreatedTasksLists } from '../../redux/selectors';
import {Bar, TodoList, FullInfo} from './components';
import classNames from 'classnames';
import IconUser from '../../assets/svg/User';

export function Application() {
const isSelectedTask = useSelector(state => getSelectedTaskId(state));
const isCreatedTasksListsValue = useSelector(state => isCreatedTasksLists(state));
const selectedTask = useSelector(state => getSelectedTaskProperty(state))
// const tasksLists = useSelector(state => state.tasks.tasksLists)
    const tasksLists = useSelector(state => getTasksLists(state));

return (
    <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
        <Bar isCreatedTasksLists = {isCreatedTasksListsValue} tasksLists = {tasksLists} />
        <TodoList isCreatedTasksLists = {isCreatedTasksListsValue} />
        
        {isSelectedTask && <FullInfo selectedTask = {selectedTask} tasksLists = {tasksLists} />}
    </div>
)
}