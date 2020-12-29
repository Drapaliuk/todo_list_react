import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTask, saveNewTask } from '../../../../redux/actions/tasks/tasks'
import { getSelectedListId, getSelectedTask, getSelectedTaskId, getSelectedTaskProperty, getSelectedTaskText } from '../../../../redux/selectors'
import { ChangeText } from './ChangeText'
import { Comment, SubTask } from './components'
import { TaskDateOption } from './components/TaskDateOption'
import { DueTime } from './components/DueTime'
import { Notes } from './components/Note'
import { Reminder } from './components/Remind'
import { Subtasks } from './components/Subtasks'
import { BiTimeFive } from 'react-icons/bi'
import { BsAlarm } from 'react-icons/bs'
import { FiRepeat } from 'react-icons/fi'
import { TaskRangeDateOption } from './components/TaskRangeDateOption'

export function FullInfo() {
    const dispatch = useDispatch();

    const {text, hasDone, isImportant, term, remind, repeat} = useSelector(state => getSelectedTaskProperty(state));
    const selectedListId = useSelector(state => getSelectedListId(state))
    const selectedTaskId = useSelector(state => getSelectedTaskId(state))
    const ids = [selectedListId, selectedTaskId]

    const onComplete =  isComplete => dispatch(changeTask(...ids, {hasDone: isComplete}))
    const onMakeImportant =  isImportant => dispatch(changeTask(...ids, {isImportant: isImportant}))
    const onSaveNewText = newText => dispatch(changeTask(...ids, {text: newText}))

    const onSaveDueDate = date => dispatch(changeTask(...ids, {term: date}))
    const onSaveRemindDate = date => dispatch(changeTask(...ids, {remind: date}))
    const onSaveRepeatTask = dates => dispatch(changeTask(...ids, {repeat: dates}))
    
    

    return (
        <div class="todo-full-info todo-full-info_theme_dark desktop">
            <ChangeText initialText = {text} 
                        hasDone = {hasDone}
                        isImportant = {isImportant}
                        onSave = {onSaveNewText} 
                        onComplete = {onComplete} 
                        onMakeImportant = {onMakeImportant}  
                    />

            
            <div class="todo-additional-option">
                <ul class="todo-additional-option__time-options">
                    <TaskDateOption onSave = {onSaveDueDate} placeholder = 'due date' Icon = {BiTimeFive} initialDate = {term} />
                    <TaskDateOption onSave = {onSaveRemindDate} placeholder = 'remind' Icon = {BsAlarm} initialDate = {remind} />
                    <TaskRangeDateOption onSave = {onSaveRepeatTask} placeholder = 'repeat task' Icon = {FiRepeat} initialDate = {repeat} />
                </ul>
                <Subtasks />
                <Notes />

                <ul class="todo-comments-list">
                    <Comment />
                </ul>
            </div>


            <div class="todo-full-info__manipulation-wrapper">
                <form class="add-comment-form">
                    <input class="add-comment-form__input" type="text" placeholder="Add comment..." />
                    <button class="add-comment-form__btn">Add</button>
                </form>
                <div class="todo-full-info__manipulations">
                    <button class="todo-full-info__close-btn">
                        <svg class="todo-full-info-icon">
                            <use href="./src/img/sprite.svg#icon-arrow-right"></use>
                        </svg>
                    </button>
                    <p class="creted-by">created yesterday by me</p>
                    <button class="todo-full-info__close-btn todo-full-info__delete-todo">
                        <svg class="todo-full-info-icon">
                            <use href="./src/img/sprite.svg#icon-delete"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
)
}