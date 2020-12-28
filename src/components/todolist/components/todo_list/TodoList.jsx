import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId, getCompletedTasks, getUncompletedTasks, getSelectedTaskId, getSortByValue, getSelectedListSettings } from '../../../../redux/selectors';
import { CompletedTask, MobileHeader, EditListLabelDesktop, TodoListSettings, UncompletedTask } from './components'
import { NewTaskInput } from './components/new_task_input/NewTaskInput';
import { UncompletedTasksList } from './components/uncompleted_task_list/UncompletedTasksList';
import { CompletedTasksList } from './components/completed_tasks_list/CompletedTasksList';

export function TodoList({isCreatedTasksLists}) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => getSelectedListSettings(state, 'sortBy')) 
    const selectedListId = useSelector(state => getSelectedListId(state));
    const uncompletedTasks = useSelector(state => getUncompletedTasks(currentSortBy)(state));
    const completedTasks = useSelector(state => getCompletedTasks(state));

    const onSelectTask = id => () => dispatch(selectTask(id))
    const onComplete =  (isComplete, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
    const onPinTask =  (isPinned, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isPinned: isPinned}))
    const onMakeImportant =  (isImportant, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isImportant: isImportant}))
    const onSortTasks = sortBy => dispatch(changeListSettings(selectedListId, {'sortBy': sortBy}))
    const onSaveTask = text => dispatch(saveNewTask(selectedListId, text))
    
    return (
        <section className="todo-section todo-section_theme_dark">
            <NewTaskInput onSave = {onSaveTask}  />
            <Route exact path = '/tasks/edit-list'  component = {EditListLabelDesktop} />
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
                                      currentSortBy = {currentSortBy} 
                
                                      />
                </Fragment>
            }
           
        </section>
    )
}