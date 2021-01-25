import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { KEY_ENTER } from '../../../../service';
import classNames from 'classnames';

export function FullInfoManipulations({onClose, onDeleteTask, onCreateComment, belongToList, selectedTaskId}) {
    const [commentText, writeCommentText] = React.useState('');
    const [isInvalidCommentText, setInvalidCommentFlag] = React.useState(false);

    console.log(belongToList, selectedTaskId)
    React.useEffect(() => {
        setInvalidCommentFlag(false)
    }, [belongToList, selectedTaskId])

    const closeHandler = () => onClose()
    const deleteHandler = () => onDeleteTask()
    const writeCommentHandler = event => {
        writeCommentText(event.target.value)
        if(isInvalidCommentText) return setInvalidCommentFlag(false)
    }
    const isEmptyField = !commentText.split(' ').some(el => el)

    const createCommentByClick = () => {
        if(!isEmptyField) {
            writeCommentText('')
            onCreateComment(commentText)
            return
        }

        if(isEmptyField) {
            writeCommentText('')
            setInvalidCommentFlag(!isInvalidCommentText)
            return
        }
    }

    const createSubtaskByKeyboard = ({keyCode}) => {
        if(keyCode === KEY_ENTER && !isEmptyField) {
            writeCommentText('')
            onCreateComment(commentText)
            return
        }

        if(keyCode === KEY_ENTER && isEmptyField) {
            writeCommentText('')
            setInvalidCommentFlag(!isInvalidCommentText)
            return
        }
    }







    return (
        <div class="todo-full-info__manipulation-wrapper">
                <div class="add-comment-form">
                    <input onChange = {writeCommentHandler}
                           onKeyDown = {createSubtaskByKeyboard}
                           className = {classNames('add-comment-form__input', {'add-comment-form__input_invalid': isInvalidCommentText})} 
                           value = {commentText} type="text" 
                           placeholder={isInvalidCommentText ? 'This field can`t be empty!' : 'Add comment...'} />

                    <button onClick = {createCommentByClick} class="add-comment-form__btn">Add</button>
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
