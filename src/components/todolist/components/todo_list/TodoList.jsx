import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId, getCompletedTasks, getUncompletedTasks, getSelectedListSettings } from '../../../../redux/selectors';
import { EditListLabelDesktop, TodoListSettings, UncompletedTask } from './components'
import { NewTaskInput } from './components/new_task_input/NewTaskInput';
import { UncompletedTasksList } from './components/uncompleted_task_list/UncompletedTasksList';
import { CompletedTasksList } from './components/completed_tasks_list/CompletedTasksList';
import { ProfileSettings } from '../../../settings/ProfileSettings';


import classNames from 'classnames';


export function TodoList({isCreatedTasksLists, currentTheme}) {
    const dispatch = useDispatch();
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sortBy'));


    const isSelectedDefaultList = useSelector(state => {
        return state.tasks.isSelectedDefaultList
    })
    const selectedListId = useSelector(state => getSelectedListId(state));
    const uncompletedTasks = useSelector(state => getUncompletedTasks(currentSortCriteria, isSelectedDefaultList, selectedListId)(state));

    const completedTasks = useSelector(state => getCompletedTasks(state));

    const onSelectTask = id => () => dispatch(selectTask(id))
    const onComplete =  (isComplete, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
    const onPinTask =  (isPinned, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isPinned: isPinned}))
    const onMakeImportant =  (isImportant, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isImportant: isImportant}))
    const onSortTasks = sortBy => dispatch(changeListSettings(selectedListId, {'sortBy': sortBy}))
    const onSaveTask = text => dispatch(saveNewTask(selectedListId, text))
    
    return (
        <section className = {classNames('todo-section', {'todo-section_theme_dark': currentTheme === 'dark'})}>
            <NewTaskInput onSave = {onSaveTask}  />
            <Route exact path = '/lists/edit-list' component = {EditListLabelDesktop} />
            <Route path = '/lists/settings' component = {ProfileSettings} />
            {
                isCreatedTasksLists
                &&
                <Fragment>
                    <UncompletedTasksList uncompletedTasks = {uncompletedTasks} 
                                          onComplete = {onComplete} 
                                          onSelectTask = {onSelectTask} 
                                          onPin = {onPinTask}
                                          onMakeImportant = {onMakeImportant}
                                        />
                    <CompletedTasksList completedTasks = {completedTasks} 
                                        onSelectTask = {onSelectTask}
                                        onComplete = {onComplete}
                                    />
                    <TodoListSettings onSortTasks = {onSortTasks} 
                                      currentSortCriteria = {currentSortCriteria}
                                      />
                </Fragment>
            }
           
        </section>
    )
}