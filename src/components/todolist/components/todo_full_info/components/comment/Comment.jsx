import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export function Comment({id, text, onDelete}) {
    const deleteHandler = () => onDelete(id)
    return (
            <li class="todo-comments-list__item">
                <div class="todo-comment">
                    <span class="todo-comment__text">{text}</span>
                    <button onClick = {deleteHandler} class="delete-btn delete-btn_todo_subtask">
                        <AiOutlineClose className="delete-btn__icon" />
                    </button>
                </div>
            </li>
    )
}
