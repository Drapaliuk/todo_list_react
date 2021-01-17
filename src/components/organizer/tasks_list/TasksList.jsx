import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask, createTodayTask, updateDefaultListSettings, updateTodayTask } from '../../../redux/actions';

import { getSelectedListId, getSelectedListSettings } from '../../../redux/selectors';
import { ProfileSettings } from '../../settings/ProfileSettings';

import { UncompletedTasksList, CompletedTasksList, EditListLabelDesktop, TodoListSettings, NewTaskInput } from './'
 
import classNames from 'classnames';
import { MobileNav } from '../../common/mobile_nav/mobile_nav';
import { DEFAULT_TASKS_LIST_IMPORTANT, DEFAULT_TASKS_LIST_TODAY, DEFAULT_TASKS_LIST_WEEK } from '../../../service';



export function TasksList({tasksListData, isCreatedTasksLists, currentTheme, isSelectedTask, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const {uncompletedTasks, completedTasks, isSelectDefaultAppList, title} = tasksListData;

    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sortBy'));
    const selectedListId = useSelector(state => getSelectedListId(state));
    const isSelectedTodayTasksList = selectedListId === DEFAULT_TASKS_LIST_TODAY;

    const onSelectTask = (taskId, selectedListId) => () => dispatch(selectTask(taskId, selectedListId))
    const onComplete =  (selectedListId, selectedTaskId) => isComplete => {
        if(isSelectedTodayTasksList) return dispatch(updateTodayTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
        dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
    }
    
    const onPinTask =  (isPinned, selectedTaskId) => {
        if(isSelectedTodayTasksList) return dispatch(updateTodayTask(selectedListId, selectedTaskId, {isPinned}))
        dispatch(changeTask(selectedListId, selectedTaskId, {isPinned}))
    }

    const onMakeImportant =  (isImportant, selectedTaskId) => {
        if(isSelectedTodayTasksList) return dispatch(updateTodayTask(selectedListId, selectedTaskId, {isImportant}))
        dispatch(changeTask(selectedListId, selectedTaskId, {isImportant}))
    }

    const onSortTasks = sortBy => {
        if(isSelectDefaultAppList) return dispatch(updateDefaultListSettings(selectedListId, {sortBy}))
        dispatch(changeListSettings(selectedListId, {sortBy}))
    }
    const onSaveTask = text => {
        if(isSelectedTodayTasksList) return dispatch(createTodayTask(selectedListId, text))
        dispatch(saveNewTask(selectedListId, text))
    }


    return (
        <section className = {classNames('todo-section', {
            'todo-section_theme_dark': currentTheme === 'dark',
            'todo-section_invisible': !isVisibleInMobVer
            })}>
            <MobileNav partName = {'selectedListName'} />
            <h2 className ='todo-list__title'>{title}</h2>
            {
                selectedListId === DEFAULT_TASKS_LIST_TODAY
                    ?
                <NewTaskInput onSave = {onSaveTask} selectedListId = {selectedListId}  />
                    :
                selectedListId !== DEFAULT_TASKS_LIST_TODAY &&
                selectedListId !== DEFAULT_TASKS_LIST_WEEK && 
                selectedListId !== DEFAULT_TASKS_LIST_IMPORTANT
                    ?
                <NewTaskInput onSave = {onSaveTask} selectedListId = {selectedListId} />
                    :
                null
            }
            
            <Route exact path = '/app/edit-list' component = {EditListLabelDesktop} />
            <Route path = '/app/settings' component = {ProfileSettings} />
            {
                isCreatedTasksLists
                &&
                <Fragment>
                    <UncompletedTasksList uncompletedTasks = {uncompletedTasks} 
                                          onComplete = {onComplete} 
                                          onSelectTask = {onSelectTask} 
                                          onPin = {onPinTask}
                                          onMakeImportant = {onMakeImportant}
                                          isSelectedTask = {isSelectedTask}
                                        />
                    {
                        completedTasks.length > 0 &&
                        <CompletedTasksList completedTasks = {completedTasks} 
                                            onSelectTask = {onSelectTask}
                                            onComplete = {onComplete}
                                    />
                    }
                    <TodoListSettings onSortTasks = {onSortTasks} 
                                      currentSortCriteria = {currentSortCriteria}
                                        />
                    
                </Fragment>
            }
           
        </section>
    )
}