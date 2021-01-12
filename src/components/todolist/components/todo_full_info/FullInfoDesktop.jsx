import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTask, closeFullInfo, deleteTask, createSubtask, 
         deleteSubtask, updateSubtask,
         createComment, deleteComment, updateComment } from '../../../../redux/actions';

import { getSelectedListId, getSelectedTaskId, getSelectedSubtaskId } from '../../../../redux/selectors';
import { Subtasks, Notes, TaskDateOption, ChangeText, TaskRangeDateOption,
         FullInfoManipulations, Comments } from './components';

import { BiTimeFive } from 'react-icons/bi';
import { BsAlarm } from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';

import classNames from 'classnames';

export function FullInfo({selectedTask, isMobileVer}) {
    const dispatch = useDispatch();

    const {text, hasDone, isImportant, term, remind, repeat, subtasks, comments, notes, _id:selectedTaskId} = selectedTask;
    const selectedListId = useSelector(state => getSelectedListId(state))
    const currentTheme = useSelector(state => state.settings.theme )
    const ids = [selectedListId, selectedTaskId]

    const onComplete =  isComplete => dispatch(changeTask(...ids, {hasDone: isComplete}))
    const onMakeImportant =  isImportant => dispatch(changeTask(...ids, {isImportant: isImportant}))
    const onSaveNewText = newText => dispatch(changeTask(...ids, {text: newText}))
    const onDeleteTask = () => dispatch(deleteTask(...ids))
    
    const onManipulationDateOption = optionName => date => dispatch(changeTask(...ids, {[optionName]: date}))
    const onCloseFullInfo = () => dispatch(closeFullInfo())


    const onCreateSubtask = text => dispatch(createSubtask(...ids, text))
    const onUpdateSubtaskText = (id, newText) => dispatch(updateSubtask(...ids, id, {text: newText}))
    const onDeleteSubtask = id => dispatch(deleteSubtask(...ids, id))
    const onCompleteSubtask = (id, isComplete) => dispatch(updateSubtask(...ids, id, {hasDone: isComplete}))
    
    const onCreateComment = text => dispatch(createComment(...ids, text))
    const onUpdateCommentText = (id, newText) => dispatch(updateComment(...ids, id, {text: newText}))
    const onDeleteComment = id => dispatch(deleteComment(...ids, id))
    const onUpdateNote = newNote => dispatch(changeTask(...ids, {notes: newNote}))



    


    const childProps = {
    subtasks: {onCreate: onCreateSubtask, 
               onUpdateText: onUpdateSubtaskText, 
               onDelete: onDeleteSubtask, 
               onComplete: onCompleteSubtask, 
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
                    onCreateComment
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
                    {/* <TaskRangeDateOption {...childProps.repeatTask} /> */}
                </ul>
                <Subtasks {...childProps.subtasks}/>
                <Notes onUpdate = {onUpdateNote} text = {notes} />
                <Comments {...childProps.comments} />
            </div>
            <FullInfoManipulations {...childProps.manipulations} />
        </div>
)
}