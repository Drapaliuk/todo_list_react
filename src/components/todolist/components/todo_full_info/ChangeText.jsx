import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import { KEY_ENTER } from '../../../../service/keyboard_codes';

export function ChangeText({initialText, onSave, onComplete, onMakeImportant, onImportant, hasDone, isImportant}) {
    const [newTaskText, setNewTaskText] = React.useState('');
    React.useEffect(() => {
        setNewTaskText(initialText)
    }, [initialText])
    
    const newTextHandler = event => setNewTaskText(event.target.value)
    const saveNewTextHandler = ({keyCode, ctrlKey}) => {
        if(keyCode === KEY_ENTER && ctrlKey) {
            onSave(newTaskText)
        }
    }

    const completeHandler = event => {
        const isCompleted = event.target.checked;
        onComplete(isCompleted)
    }

    const makeImportantHandler = () => {onMakeImportant(!isImportant)}

    return (
        <div class="todo-full-text">
            <input checked = {hasDone} onChange = {completeHandler} type="checkbox" class="todo-full-text__check-input-todo" />
            <textarea onKeyDown = {saveNewTextHandler} onChange = {newTextHandler}  value = {newTaskText} class="todo-full-text__text" name="" placeholder="fulltext"></textarea>
            <button onClick = {makeImportantHandler} class="todo-full-text__importantly-btn importantly-btn importantly-btn_todo importantly-btn_active">
                <AiOutlineStar className = 'todo-full-text__icon importantly-btn__icon' fill = {'yellow'} />
            </button>
        </div>
    )
}



// const childProps = {
//     subtasks: {onCreate: onCreateSubtask, 
//                onUpdateText, 
//                onDelete: onDeleteSubtask, 
//                onComplete: onCompleteSubtask, 
//                subtasks},

//     changeText: {initialText: text,
//                  hasDone,
//                  isImportant,
//                  onSave: onSaveNewText,
//                  onComplete,
//                  onMakeImportant},

//     dueDate: {onManipulation: onManipulationDateOption('term'),
//               placeholder: 'due date',
//               Icon: BiTimeFive,
//               initialDate: term},

//     remind: {onManipulation: onManipulationDateOption('remind'),
//              placeholder: 'remind',
//              Icon: BsAlarm,
//              initialDate: remind},

//     repeatTask: {onManipulation: onManipulationDateOption('repeat'),
//                 placeholder: 'repeat task',
//                 Icon: FiRepeat,
//                 initialDate: repeat},
//     manipulations: {onClose: onCloseFullInfo,
//                     onDeleteTask: onDeleteTask}

// }