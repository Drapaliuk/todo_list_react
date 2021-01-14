import React from 'react'
import { useSelector } from 'react-redux';
import { getSelectedTaskId, getSelectedTaskProperty, getTasksLists, isCreatedTasksLists } from '../../redux/selectors';
import {Bar, TodoList, FullInfo} from './components';
import { AppList } from './components/app_list/AppList';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export function Application() {
    const location = useLocation()
    const mobileVersionVisiblePage = {
        bar: location.pathname === '/app',
        list: location.pathname === '/app/list',
        settings: location.pathname === '/app/settings'
    }

    const isSelectedTask = useSelector(state => getSelectedTaskId(state));
    const isCreatedTasksListsValue = useSelector(state => isCreatedTasksLists(state));
    const selectedTask = useSelector(state => getSelectedTaskProperty(state))
    const tasksLists = useSelector(state => getTasksLists(state));
    const isSelectedAppList = useSelector(state => state.tasks.isSelectedAppList);
    const currentTheme = useSelector(state => state.settings.theme);
    return (
        <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
            <Bar isVisibleInMobVer = {mobileVersionVisiblePage.bar} currentTheme = {currentTheme} isCreatedTasksLists = {isCreatedTasksListsValue} tasksLists = {tasksLists} />
            {
                isSelectedAppList 
                    ? 
                <AppList isVisibleInMobVer = {mobileVersionVisiblePage.list} 
                         currentTheme = {currentTheme} /> 
                    : 
                <TodoList isVisibleSettingsInMobVer = {mobileVersionVisiblePage.settings}  
                          isVisibleInMobVer = {mobileVersionVisiblePage.list} 
                          isSelectedTask = {isSelectedTask} 
                          currentTheme = {currentTheme} 
                          isCreatedTasksLists = {isCreatedTasksListsValue} />
            }
                
            {
                isSelectedTask 
                    && 
                <FullInfo isMobileVer = {false} 
                          currentTheme = {currentTheme} 
                          selectedTask = {selectedTask} 
                          tasksLists = {tasksLists} />
            }
        </div>
    )
}