import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTask, closeFullInfo, deleteTask, createSubtask, 
         deleteSubtask, updateSubtask,
         createComment, deleteComment } from '../../../redux/actions';

import { Subtasks, Notes, TaskDateOption, ChangeText,
         FullInfoManipulations, Comments } from '.';

import { BiTimeFive } from 'react-icons/bi';
import { BsAlarm } from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';

import classNames from 'classnames';

export function TaskFullInfo({selectedTask, isMobileVer}) {
    const dispatch = useDispatch();
    const {text, hasDone, isImportant, belongToList, term, remind, repeat, subtasks, comments, notes, _id:selectedTaskId} = selectedTask;
    const selectedFolderID = useSelector(state => state.organizer.selectedFolderID)
    const currentTheme = useSelector(state => state.settings.theme )
    const ids = [belongToList, selectedTaskId]

    const onComplete =  isComplete => dispatch(changeTask(...ids, {hasDone: isComplete}, selectedFolderID))
    const onMakeImportant =  isImportant => dispatch(changeTask(...ids, {isImportant: isImportant}, selectedFolderID))
    const onSaveNewText = newText => dispatch(changeTask(...ids, {text: newText}, selectedFolderID))
    const onDeleteTask = () => dispatch(deleteTask(...ids, selectedFolderID))
    
    const onManipulationDateOption = optionName => date => dispatch(changeTask(...ids, {[optionName]: date}, selectedFolderID))
    const onCloseFullInfo = () => dispatch(closeFullInfo())


    const onCreateSubtask = text => dispatch(createSubtask(...ids, text, selectedFolderID))
    const onUpdateSubtaskText = (id, newText) => dispatch(updateSubtask(...ids, id, {text: newText}, selectedFolderID))
    const onDeleteSubtask = id => dispatch(deleteSubtask(...ids, id, selectedFolderID))
    const onCompleteSubtask = (id, isComplete) => dispatch(updateSubtask(...ids, id, {hasDone: isComplete}, selectedFolderID))
    
    const onCreateComment = text => dispatch(createComment(...ids, text, selectedFolderID))
    const onDeleteComment = id => dispatch(deleteComment(...ids, id, selectedFolderID))
    const onUpdateNote = newNote => dispatch(changeTask(...ids, {notes: newNote}, selectedFolderID))



    


    const childProps = {
    subtasks: {onCreate: onCreateSubtask, 
               onUpdateText: onUpdateSubtaskText, 
               onDelete: onDeleteSubtask, 
               onComplete: onCompleteSubtask, 
               belongToList,
               selectedTaskId,
               subtasks},

    changeText: {initialText: text,
                 hasDone,
                 isImportant,
                 onSave: onSaveNewText,
                 onComplete,
                 onMakeImportant},

    dueDate: {onManipulation: onManipulationDateOption('term'),
              placeholder: 'due date',
              Icon: BiTimeFive,
              initialDate: term},

    remind: {onManipulation: onManipulationDateOption('remind'),
             placeholder: 'remind',
             Icon: BsAlarm,
             initialDate: remind},

    repeatTask: {onManipulation: onManipulationDateOption('repeat'),
                placeholder: 'repeat task',
                Icon: FiRepeat,
                initialDate: repeat},
    manipulations: {onClose: onCloseFullInfo,
                    onDeleteTask,
                    onCreateComment, 
                    belongToList, 
                    selectedTaskId
                },
    comments: {comments, onDeleteComment}

}

    return (
        <div className = {classNames('todo-full-info', {
                'todo-full-info_theme_dark': currentTheme === 'dark',
                'todo-full-info_mobile': isMobileVer
                })}>
            <ChangeText {...childProps.changeText}/>
            <div class="todo-additional-option">
                <ul class="todo-additional-option__time-options">
                    <TaskDateOption {...childProps.dueDate} />
                    <TaskDateOption {...childProps.remind} />
                </ul>
                <Subtasks {...childProps.subtasks}/>
                <Notes onUpdate = {onUpdateNote} text = {notes} />
                <Comments {...childProps.comments} />
            </div>
            <FullInfoManipulations {...childProps.manipulations} />
        </div>
)
}