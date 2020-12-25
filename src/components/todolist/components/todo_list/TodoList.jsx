import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom'
import { saveNewTask } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId, getTasks } from '../../../../redux/selectors';
import { CompletedTask, MobileHeader,EditListLabelDesktop, TodoListSettings, UncompletedTask } from './components'
import { NewTaskInput } from './components/new_task_input/NewTaskInput';

export function TodoList() {
    console.log('todo list rerender')
    const dispatch = useDispatch();
    const selectedListId = useSelector(state => getSelectedListId(state))
    const tasks = useSelector(state => getTasks(state));
    console.log('tasks', tasks)
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
            <ul className="todo-list">
                {
                    tasks.map(task => <UncompletedTask text = {task.text} />)
                }
                
            </ul>
            <div className="visible-completed-todo visible-completed-todo_theme_dark">
                <button className="visible-completed-todo__btn">completed item</button>
                <svg className="visible-completed-todo__icon">
                    <use href="./src/img/sprite.svg#icon-eye"></use>
                </svg>
                <svg className="icon">
                    <use href="./src/img/sprite.svg#icon-eye-blocked"></use>
                </svg>
            </div>
            <ul className="todo-list">
                <CompletedTask />
            </ul>
            <TodoListSettings />
        </section>
    )
}