import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask } from '../../../redux/actions';

import { getSelectedDefaultListId, getSelectedListSettings, getSelectedListsIds, getSelectedTaskId } from '../../../redux/selectors';
import { ProfileSettings } from '../../settings/ProfileSettings';

import { CompletedTasksList, EditListLabelDesktop, TodoListSettings, NewTaskInput } from './'
 
import classNames from 'classnames';
import { MobileNav } from '../../common/mobile_nav/mobile_nav';
import { DEFAULT_TASKS_LIST_IMPORTANT, DEFAULT_TASKS_LIST_TODAY, DEFAULT_TASKS_LIST_WEEK } from '../../../service';
import { Task } from './task/Task';
import { RiWifiOffLine } from 'react-icons/ri';



export function TasksList({tasksListData, currentTheme, isSelectedTask, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const {uncompletedTasks, completedTasks, title} = tasksListData;
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sortBy'));
    const {selectedUserListId, selectedDefaultListId} = useSelector(state => getSelectedListsIds(state));
    const wasLostConnection = useSelector(state => state.initialize.wasLostConnection)



    const onSelectTask = (listId, taskId) => dispatch(selectTask(taskId, listId))
    const onComplete =  (listId, taskId, isCompleted) => dispatch(changeTask(listId, taskId, {hasDone: isCompleted}))
    const onPinTask =  (listId, taskId, isPinned) => dispatch(changeTask(listId, taskId, {isPinned}))
    const onMakeImportant =  (listId, taskId, isImportant) => dispatch(changeTask(listId, taskId, {isImportant}))
    const onSortTasks = sortBy => {
        if(selectedDefaultListId) {
            return dispatch(changeListSettings(selectedDefaultListId, {sortBy}))
        }
        return dispatch(changeListSettings(selectedUserListId, {sortBy}))

    }
    const onCreateTask = (selectedListId, text) => dispatch(saveNewTask(selectedListId, text))
    const selectedTaskId = useSelector(state => getSelectedTaskId(state))
    
    return (
        <section className = {classNames('todo-section', {
            'todo-section_theme_dark': currentTheme === 'dark',
            'todo-section_invisible': !isVisibleInMobVer
            })}>

            {
                wasLostConnection &&
                <div className = 'network-lost__message-wrapper'>
                    <RiWifiOffLine className = 'network-lost__icon' /> <span className = 'network-lost__message'>Network connection has been lost!</span>
                </div>
            }
            


            <MobileNav partName = {'selectedListName'} />
            <h2 className ='todo-list__title'>{title}</h2>
            {
                selectedDefaultListId === DEFAULT_TASKS_LIST_TODAY
                    ?
                <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedDefaultListId}  />
                    :
                selectedDefaultListId !== DEFAULT_TASKS_LIST_TODAY &&
                selectedDefaultListId !== DEFAULT_TASKS_LIST_WEEK && 
                selectedDefaultListId !== DEFAULT_TASKS_LIST_IMPORTANT
                    ?
                <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedUserListId} />
                    :
                null
            }
            
            <Route exact path = '/app/edit-list' component = {EditListLabelDesktop} />
            <Route path = '/app/settings' component = {ProfileSettings} />
            <>
                <ul className="todo-list">
                    {uncompletedTasks.map(currentTask => {
                        return <Task {...{key: currentTask._id, onComplete, onSelectTask, onPinTask, onMakeImportant, currentTask, selectedTaskId}} />
                    })}
                </ul>
                {
                    completedTasks.length > 0 &&
                    <CompletedTasksList {...{completedTasks, onSelectTask, onComplete, selectedTaskId}} />
                }
                <TodoListSettings {...{onSortTasks, currentSortCriteria}} />
            </>
        </section>
    )
}