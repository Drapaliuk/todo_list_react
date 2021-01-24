import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, searchByLetters, selectTask } from '../../../redux/actions';

import { getSelectedListSettings, getSelectedListsIds, getSelectedTaskId } from '../../../redux/selectors';
import { ProfileSettings } from '../../settings/ProfileSettings';

import { CompletedTasksList, EditListLabelDesktop, TodoListSettings, NewTaskInput } from './'
 
import classNames from 'classnames';
import { MobileNav } from '../../common/mobile_nav/mobile_nav';
import { defaultTasksListsIds } from '../../../service';
import { Task } from './task/Task';
import { LostConnection } from '../../';
import { SearchTaskByLettersInput } from './todo_list_settings/SearchTaskByLetter';



export function TasksList({tasksListData, currentTheme, isVisibleInMobVer}) {
    const [isVisibleSearchTaskInput, setVisibleSearchTaskInput] = React.useState(false)

    const dispatch = useDispatch();
    const {uncompletedTasks, completedTasks, title} = tasksListData;
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sort'));
    const {selectedUserListId, selectedDefaultListId} = useSelector(state => getSelectedListsIds(state));
    const wasLostConnection = useSelector(state => state.initialize.wasLostConnection)
    const currentSearchTaskPattern = useSelector(state => state.organizer.searchByLettersPattern)


    const onSelectTask = (listId, taskId) => dispatch(selectTask(taskId, listId))
    const onComplete =  (listId, taskId, isCompleted) => dispatch(changeTask(listId, taskId, {hasDone: isCompleted}))
    const onPinTask =  (listId, taskId, isPinned) => dispatch(changeTask(listId, taskId, {isPinned}))
    const onMakeImportant =  (listId, taskId, isImportant) => dispatch(changeTask(listId, taskId, {isImportant}))
    const onVisibleSearchTaskInput = () => setVisibleSearchTaskInput(!isVisibleSearchTaskInput)
    const onSearchByLetters = pattern => dispatch(searchByLetters(pattern))

    const onSortTasks = sort => {
        if(selectedDefaultListId) {
            return dispatch(changeListSettings(selectedDefaultListId, {sort}))
        }
        return dispatch(changeListSettings(selectedUserListId, {sort}))

    }
    const onCreateTask = (selectedListId, text) => dispatch(saveNewTask(selectedListId, text))
    const selectedTaskId = useSelector(state => getSelectedTaskId(state))

    return (
        <section className = {classNames('todo-section', {
            'todo-section_theme_dark': currentTheme === 'dark',
            'todo-section_invisible': !isVisibleInMobVer
            })}>

            {wasLostConnection && <LostConnection />}
            { isVisibleSearchTaskInput && <SearchTaskByLettersInput {...{onSearchByLetters, onVisibleSearchTaskInput, currentSearchTaskPattern}} />}
            <MobileNav partName = {'selectedListName'} />
            <h2 className ='todo-list__title'>{title}</h2>
            {
                selectedDefaultListId === defaultTasksListsIds.DEFAULT_LIST__today
                    ?
                <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedDefaultListId}  />
                    :
                !defaultTasksListsIds.hasOwnProperty(selectedDefaultListId)
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
                <TodoListSettings {...{onSortTasks, currentSortCriteria, onVisibleSearchTaskInput}} />
            </>
        </section>
    )
}