import React from 'react'
import { BsTrash } from 'react-icons/bs'

export function FullInfoManipulations({onClose, onDeleteTask}) {
    const closeHandler = () => onClose()
    const deleteHandler = () => onDeleteTask()
    return (
        <div class="todo-full-info__manipulation-wrapper">
                <form class="add-comment-form">
                    <input class="add-comment-form__input" type="text" placeholder="Add comment..." />
                    <button class="add-comment-form__btn">Add</button>
                </form>
                <div class="todo-full-info__manipulations">
                    <button onClick = {closeHandler} class="todo-full-info__close-btn">
                        {/* <svg class="todo-full-info-icon">
                            <use href="./src/img/sprite.svg#icon-arrow-right"></use>
                        </svg> */}
                        close
                    </button>
                    <p class="creted-by">created yesterday by me</p>
                    <button onClick = {deleteHandler} class="todo-full-info__close-btn todo-full-info__delete-todo">
                        <BsTrash className="todo-full-info-icon" />
                    </button>
                </div>
            </div>
    )
}
