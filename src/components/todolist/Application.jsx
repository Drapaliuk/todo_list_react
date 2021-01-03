import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTaskId, getSelectedTaskProperty, getTasksLists, isCreatedTasksLists } from '../../redux/selectors';
import {Bar, TodoList, FullInfo} from './components';
import classNames from 'classnames';
import IconUser from '../../assets/svg/User';
import { AppList } from './components/app_list/AppList';

export function Application() {
    const isSelectedTask = useSelector(state => getSelectedTaskId(state));
    const isCreatedTasksListsValue = useSelector(state => isCreatedTasksLists(state));
    const selectedTask = useSelector(state => getSelectedTaskProperty(state))
    const tasksLists = useSelector(state => getTasksLists(state));
    const isSelectedAppList = useSelector(state => state.tasks.isSelectedAppList);
    const currentTheme = useSelector(state => state.settings.theme)



    console.log('isSelectedAppList', isSelectedAppList)
    return (
        <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
            <Bar currentTheme = {currentTheme} isCreatedTasksLists = {isCreatedTasksListsValue} tasksLists = {tasksLists} />
            {
                isSelectedAppList ? <AppList currentTheme = {currentTheme} /> 
                : 
                <TodoList currentTheme = {currentTheme} isCreatedTasksLists = {isCreatedTasksListsValue} />
            }
            {isSelectedTask && <FullInfo currentTheme = {currentTheme} selectedTask = {selectedTask} tasksLists = {tasksLists} />}
        </div>
    )
}