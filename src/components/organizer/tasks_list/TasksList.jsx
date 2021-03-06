import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, searchByLetters, searchTaskByLetters, selectTask } from '../../../redux/actions';

import { getSelectedListSettings, getSelectedListsIds, getSelectedTaskId } from '../../../redux/selectors';
import { ProfileSettings } from '../../settings/ProfileSettings';

import { CompletedTasksList, EditListLabelDesktop, TodoListSettings, NewTaskInput } from './'
 
import classNames from 'classnames';
import { MobileNav } from '../../common/mobile_nav/mobile_nav';
import { Task } from './task/Task';
import { LostConnection } from '../../';
import { SearchTaskByLettersInput } from './todo_list_settings/SearchTaskByLetter';
import { NotFoundTasks } from './not_found_tasks/not_found_tasks';



export function TasksList({tasksListData, currentTheme, isVisibleInMobVer}) {
    const dispatch = useDispatch();

    const {uncompletedTasks, completedTasks, title} = tasksListData;
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sort'));
    const wasLostConnection = useSelector(state => state.initialize.wasLostConnection)
    const selectedFolderID = useSelector(state => state.organizer.selectedFolderID)
    const selectedTaskId = useSelector(state => getSelectedTaskId(state))
    const currentSearchTaskPattern = useSelector(state => state.organizer.searchByLettersPattern)
    const {selectedUserListId, selectedDefaultListId} = useSelector(state => getSelectedListsIds(state));
    const selectedListID = selectedUserListId || selectedDefaultListId

    const onSelectTask = (listId, taskId) => dispatch(selectTask(taskId, listId))
    const onComplete =  (listId, taskId, isCompleted) => dispatch(changeTask(listId, taskId, {hasDone: isCompleted}, selectedFolderID))
    const onPinTask =  (listId, taskId, isPinned) => dispatch(changeTask(listId, taskId, {isPinned}, selectedFolderID))
    const onMakeImportant =  (listId, taskId, isImportant) => dispatch(changeTask(listId, taskId, {isImportant}, selectedFolderID))
    const onSearchByLetters = pattern => dispatch(searchByLetters(pattern))
    const onCloseSearchTasksInput = () => onSortTasks({sortBy: '', order: ''})
    const onCreateTask = (selectedListId, text) => dispatch(saveNewTask(selectedListId, text, selectedFolderID))
    const onSortTasks = sort => dispatch(changeListSettings(selectedListID, {sort}, selectedFolderID))
    const onSearchTasks = sort => dispatch(searchTaskByLetters(selectedListID, {sort}, selectedFolderID))

    return (
        <section className = {classNames('todo-section', {
            'todo-section_theme_dark': currentTheme === 'dark',
            'todo-section_invisible': !isVisibleInMobVer
            })}>

            {wasLostConnection && <LostConnection />}
            { currentSortCriteria.sortBy === 'searchByLetters' &&
              <SearchTaskByLettersInput {...{onSearchByLetters, onCloseSearchTasksInput, currentSearchTaskPattern}} />}
            <MobileNav partName = {'selectedListName'} />
            
            <h2 className ='todo-list__title'>{title}</h2>
            
            <NewTaskInput {...{onCreateTask, selectedUserListId, selectedDefaultListId}} />
            <Route exact path = '/app/edit-list' component = {EditListLabelDesktop} />
            <Route path = '/app/settings' component = {ProfileSettings} />
            {currentSearchTaskPattern && uncompletedTasks.length === 0 && completedTasks.length === 0 &&
                <NotFoundTasks {...{currentSearchTaskPattern}} />}
            <>
                <ul className="todo-list">
                    {uncompletedTasks.map(currentTask => {
                        return <Task {...{key: currentTask._id, onComplete, onSelectTask, onPinTask, onMakeImportant, currentTask, selectedTaskId}} />
                    })}
                </ul>
                {completedTasks.length > 0 &&
                <CompletedTasksList {...{completedTasks, onSelectTask, onComplete, selectedTaskId}} />}
                <TodoListSettings {...{onSortTasks, currentSortCriteria, onSearchTasks}} />
            </>
        </section>
    )
}