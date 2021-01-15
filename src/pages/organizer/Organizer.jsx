import React from 'react'
import { useSelector } from 'react-redux';
import { getSelectedTaskId, getSelectedTaskProperty, getTasksForDefaultAppList,
         getTasksLists, isCreatedTasksLists,
         getTasksForUserLists, 
         getSelectedListProperty} from '../../redux/selectors';

import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { TasksList, TaskFullInfo, Bar } from '../../components';

export function Organizer() {
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
    const currentTheme = useSelector(state => state.settings.theme);
    const tasksListData = useSelector(state => {
        if(state.tasks.isSelectedAppList) {
            return {...getTasksForDefaultAppList(state), isSelectDefaultAppList: true, title: getSelectedListProperty(state, 'title')}
        }
        return {...getTasksForUserLists(state), isSelectDefaultAppList: false, title: getSelectedListProperty(state, 'name')}
    })



    if(!tasksListData) return null
    return (
        <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
            <Bar isVisibleInMobVer = {mobileVersionVisiblePage.bar} currentTheme = {currentTheme} isCreatedTasksLists = {isCreatedTasksListsValue} tasksLists = {tasksLists} />
            <TasksList isVisibleSettingsInMobVer = {mobileVersionVisiblePage.settings}  
                      isVisibleInMobVer = {mobileVersionVisiblePage.list} 
                      isSelectedTask = {isSelectedTask} 
                      currentTheme = {currentTheme} 
                      isCreatedTasksLists = {isCreatedTasksListsValue} 
                      tasksListData = {tasksListData}
                    />
                
            {
                isSelectedTask 
                    && 
                <TaskFullInfo isMobileVer = {false} 
                          currentTheme = {currentTheme} 
                          selectedTask = {selectedTask} 
                          tasksLists = {tasksLists} />
            }
        </div>
    )
}