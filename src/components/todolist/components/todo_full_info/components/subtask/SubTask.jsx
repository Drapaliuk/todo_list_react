import React from 'react'

export function SubTask() {
return (
<li class="todo-subtasks__list-item">
    <div class="todo-subtask">
        <input class="todo-subtask__check-input-subtask" type="checkbox" />
        <span class="todo-subtask__text">Some subtask</span>
        <button class="delete-btn delete-btn_todo_subtask">
            <svg class="delete-btn__icon">
                <use href="./src/img/sprite.svg#icon-cancel"></use>
            </svg>
        </button>
    </div>
</li>
)
}