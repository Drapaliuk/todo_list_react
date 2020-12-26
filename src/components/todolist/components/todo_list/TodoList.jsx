import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { changeTask, saveNewTask, selectTask } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId, getCompletedTasks, getUncompletedTasks, getSelectedTaskId } from '../../../../redux/selectors';
import { CompletedTask, MobileHeader,EditListLabelDesktop, TodoListSettings, UncompletedTask } from './components'
import { NewTaskInput } from './components/new_task_input/NewTaskInput';
import { UncompletedTasksList } from './components/uncompleted_task_list/UncompletedTasksList';
import { CompletedTasksList } from './components/completed_tasks_list/CompletedTasksList';

export function TodoList() {
    const dispatch = useDispatch();

    const selectedListId = useSelector(state => getSelectedListId(state));
    const selectedTaskId = useSelector(state => getSelectedTaskId(state)); //?

    console.log('selectedTaskId', selectedTaskId)

    const uncompletedTasks = useSelector(state => getUncompletedTasks(state));
    const completedTasks = useSelector(state => getCompletedTasks(state));

    const onSelectTask = id => () => dispatch(selectTask(id))
    const onComplete =  (newValue, selectedTaskId) => {
        dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: newValue}))
        
    }

    const onSaveTask = text => event => {
        const KEY_ENTER = 13;
        if(event.keyCode === KEY_ENTER) {
            dispatch(saveNewTask(selectedListId, text))
        }
    }
    
    return (
        <section className="todo-section todo-section_theme_dark">
            <NewTaskInput onSaveTask = {onSaveTask}  />
            <Route exact path = '/tasks/edit-list'  component = {EditListLabelDesktop} />
            <UncompletedTasksList uncompletedTasks = {uncompletedTasks} onComplete = {onComplete} onSelectTask = {onSelectTask} />
            <CompletedTasksList completedTasks = {completedTasks} onSelectTask = {onSelectTask} />
            <TodoListSettings />
        </section>
    )
}