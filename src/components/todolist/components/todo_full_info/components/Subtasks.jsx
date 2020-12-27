import React from 'react'
import { SubTask } from './subtask/SubTask'

export function Subtasks() {
    return (
        <div class="todo-subtasks">
            <form class="todo-subtasks__add-form">
                <button class="todo-subtasks__add-form-btn" type="submit">+</button>
                <input class="todo-subtasks__add-form-input" type="text" placeholder="add subtask" />
            </form>
            <ul class="todo-subtasks__list">
                <SubTask />
            </ul>
        </div>
    )
}
