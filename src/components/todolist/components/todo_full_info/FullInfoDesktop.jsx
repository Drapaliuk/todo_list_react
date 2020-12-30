import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTask, closeFullInfo, deleteTask } from '../../../../redux/actions/tasks/tasks'
import { getSelectedListId, getSelectedTaskId } from '../../../../redux/selectors'
import { ChangeText } from './ChangeText'
import { Comment, SubTask} from './components'
import { TaskDateOption } from './components/TaskDateOption'
import { Notes } from './components/Note'
import { Subtasks } from './components/Subtasks'
import { BiTimeFive } from 'react-icons/bi'
import { BsAlarm } from 'react-icons/bs'
import { FiRepeat } from 'react-icons/fi'
import { TaskRangeDateOption } from './components/TaskRangeDateOption'
import { BsTrash } from 'react-icons/bs'
import { createSubtask, deleteSubtask, updateSubtask } from '../../../../redux/actions'
import { getSelectedSubtaskId } from '../../../../redux/selectors/subtasks'

export function FullInfo({selectedTask}) {
    const dispatch = useDispatch();

    const {text, hasDone, isImportant, term, remind, repeat, subtasks} = selectedTask;
    
    const selectedListId = useSelector(state => getSelectedListId(state))
    const selectedTaskId = useSelector(state => getSelectedTaskId(state))
    const selectedSubtaskId = useSelector(state => getSelectedSubtaskId(state))
    const ids = [selectedListId, selectedTaskId]

    const onComplete =  isComplete => dispatch(changeTask(...ids, {hasDone: isComplete}))
    const onMakeImportant =  isImportant => dispatch(changeTask(...ids, {isImportant: isImportant}))
    const onSaveNewText = newText => dispatch(changeTask(...ids, {text: newText}))
    const deleteTaskHandler = () => dispatch(deleteTask(...ids))
    
    const onManipulationDateOption = optionName => date => dispatch(changeTask(...ids, {[optionName]: date}))
    const closeFullInfoHandler = () => dispatch(closeFullInfo())


    const onCreateSubtask = text => dispatch(createSubtask(...ids, text))
    const onChangeText = newText => dispatch(updateSubtask(...ids, selectedSubtaskId, {text: newText}))
    const onDeleteSubtask = subtaskId => dispatch(deleteSubtask(...ids, subtaskId))
    const onCompleteSubtask = isComplete => dispatch(updateSubtask(...ids, selectedSubtaskId, {hasDone: isComplete}))
    
    

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
                    <TaskDateOption onManipulation = {onManipulationDateOption('term')} placeholder = 'due date' Icon = {BiTimeFive} initialDate = {term} />
                    <TaskDateOption onManipulation = {onManipulationDateOption('remind')} placeholder = 'remind' Icon = {BsAlarm} initialDate = {remind} />
                    <TaskRangeDateOption onManipulation = {onManipulationDateOption('repeat')} placeholder = 'repeat task' Icon = {FiRepeat} initialDate = {repeat} />
                </ul>
                <Subtasks 
                          subtasks = {subtasks} 
                          onCreate = {onCreateSubtask} 
                          onChangeText = {onChangeText} 
                          onDelete = {onDeleteSubtask}
                          onCompleteSubtask = {onCompleteSubtask}
                          
                          />
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
                    <button onClick = {closeFullInfoHandler} class="todo-full-info__close-btn">
                        {/* <svg class="todo-full-info-icon">
                            <use href="./src/img/sprite.svg#icon-arrow-right"></use>
                        </svg> */}
                        close
                    </button>
                    <p class="creted-by">created yesterday by me</p>
                    <button onClick = {deleteTaskHandler} class="todo-full-info__close-btn todo-full-info__delete-todo">
                        <BsTrash className="todo-full-info-icon" />
                    </button>
                </div>
            </div>
        </div>
)
}