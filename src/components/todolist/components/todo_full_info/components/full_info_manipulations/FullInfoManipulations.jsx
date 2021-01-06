import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md';

export function FullInfoManipulations({onClose, onDeleteTask, onCreateComment}) {
    const [commentText, writeCommentText] = React.useState('')
    const closeHandler = () => onClose()
    const deleteHandler = () => onDeleteTask()
    const createCommentHandler = () => onCreateComment(commentText)
    const writeCommentHandler = event => writeCommentText(event.target.value)
    return (
        <div class="todo-full-info__manipulation-wrapper">
                <div class="add-comment-form">
                    <input onChange = {writeCommentHandler} class="add-comment-form__input" value = {commentText} type="text" placeholder="Add comment..." />
                    <button onClick = {createCommentHandler} class="add-comment-form__btn">Add</button>
                </div>
                <div class="todo-full-info__manipulations">
                    <button onClick = {closeHandler} class="todo-full-info__close-btn">
                        <MdKeyboardArrowRight className = 'todo-full-info-icon' />
                    </button>
                    <button onClick = {deleteHandler} class="todo-full-info__close-btn todo-full-info__delete-todo">
                        <BsTrash className="todo-full-info-icon" />
                    </button>
                </div>
            </div>
    )
}
