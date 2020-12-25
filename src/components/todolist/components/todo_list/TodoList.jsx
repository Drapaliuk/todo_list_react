import React from 'react'
import { Route } from 'react-router-dom'
import { CompletedTask, MobileHeader,EditListLabelDesktop, TodoListSettings, UncompletedTask } from './components'

export function TodoList() {
return (
        <section className="todo-section todo-section_theme_dark">
            {/* <MobileHeader /> */}

            <input className="add-todo add-todo_theme_dark" type="text" placeholder="+ Add todo" />
            <Route exact path = '/tasks/edit-list'  component = {EditListLabelDesktop} />
            <ul className="todo-list">
                <UncompletedTask />
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