import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask } from '../../../redux/actions';

import { getSelectedListId, getSelectedListSettings } from '../../../redux/selectors';
import { ProfileSettings } from '../../settings/ProfileSettings';

import { CompletedTasksList, EditListLabelDesktop, TodoListSettings, NewTaskInput } from './'
 
import classNames from 'classnames';
import { MobileNav } from '../../common/mobile_nav/mobile_nav';
import { DEFAULT_TASKS_LIST_IMPORTANT, DEFAULT_TASKS_LIST_TODAY, DEFAULT_TASKS_LIST_WEEK } from '../../../service';
import { Task } from './task/Task';



export function TasksList({tasksListData, isCreatedTasksLists, currentTheme, isSelectedTask, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const {uncompletedTasks, completedTasks, title} = tasksListData;
    console.log('tasksListData', tasksListData)
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sortBy'));

    console.log('currentSortCriteria', currentSortCriteria)

    const selectedListId = useSelector(state => getSelectedListId(state));
    const onSelectTask = (listId, taskId) => dispatch(selectTask(taskId, listId))
    const onComplete =  (listId, taskId, isCompleted) => dispatch(changeTask(listId, taskId, {hasDone: isCompleted}))
    const onPinTask =  (listId, taskId, isPinned) => dispatch(changeTask(listId, taskId, {isPinned}))
    const onMakeImportant =  (listId, taskId, isImportant) => dispatch(changeTask(listId, taskId, {isImportant}))
    const onSortTasks = sortBy => dispatch(changeListSettings(selectedListId, {sortBy}))
    const onCreateTask = text => dispatch(saveNewTask(selectedListId, text))

    
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
                <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedListId}  />
                    :
                selectedListId !== DEFAULT_TASKS_LIST_TODAY &&
                selectedListId !== DEFAULT_TASKS_LIST_WEEK && 
                selectedListId !== DEFAULT_TASKS_LIST_IMPORTANT
                    ?
                <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedListId} />
                    :
                null
            }
            
            <Route exact path = '/app/edit-list' component = {EditListLabelDesktop} />
            <Route path = '/app/settings' component = {ProfileSettings} />
            <>
                <ul className="todo-list">
                    {uncompletedTasks.map(currentTask => {
                        return <Task {...{key: currentTask._id, onComplete, onSelectTask, onPinTask, onMakeImportant, currentTask, isSelectedTask}} />
                    })}
                </ul>
                {
                    completedTasks.length > 0 &&
                    <CompletedTasksList {...{completedTasks, onSelectTask, onComplete,}} />
                }
                <TodoListSettings {...{onSortTasks, currentSortCriteria}} />
            </>
        </section>
    )
}