import React from 'react'

export function Comment() {
return (
<li class="todo-comments-list__item">
    <div class="todo-comment">
        <span class="todo-comment__text">Some comment</span>
        <button class="delete-btn delete-btn_todo_subtask">
            <svg class="delete-btn__icon">
                <use href="./src/img/sprite.svg#icon-cancel"></use>
            </svg>
        </button>
    </div>
</li>
)
}
