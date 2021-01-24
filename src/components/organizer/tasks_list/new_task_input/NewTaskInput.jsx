import React from 'react'
import { defaultTasksListsIds, KEY_ENTER } from '../../../../service';
import classNames from 'classnames';

export function NewTaskInput({onCreateTask, selectedUserListId, selectedDefaultListId}) {
    const [isInvalidTaskText, setInvalidFlag] = React.useState(false)
    const [taskText, setTaskText] = React.useState('');
    const belongToList = selectedDefaultListId || selectedUserListId;

    React.useEffect(() => {
        setInvalidFlag(false)
        setTaskText('')
    }, [belongToList])

    const writeTextHandler = event => {
        setTaskText(event.target.value)
        setInvalidFlag(false)

    };
    const saveTaskHandler = ({keyCode}) => {
        const isEmptyField = !taskText.split(' ').some(el => el)
        if(keyCode === KEY_ENTER && !isEmptyField) {
            setTaskText('')
            onCreateTask(belongToList, taskText)
            return
        }

        if(keyCode === KEY_ENTER && isEmptyField) {
            setTaskText('')
            setInvalidFlag(!isInvalidTaskText)
            return
        }

    }

    if( belongToList === defaultTasksListsIds.DEFAULT_LIST__today ||
        !defaultTasksListsIds.hasOwnProperty(belongToList)) {
            return (
                <div className = {classNames ('add-todo-wrapper', {'add-todo_invalid': isInvalidTaskText})} >
                    <input className = 'add-todo' 
                           type="text" 
                           placeholder={isInvalidTaskText ? 'This field can`t be empty!' : '+ Add todo'} 
                           onChange = {writeTextHandler}
                           onKeyDown = {saveTaskHandler}
                           value = {taskText}  
                    />
                </div>
            )
    }
    return null

    
}

// {
//     selectedDefaultListId === defaultTasksListsIds.DEFAULT_LIST__today
//         ?
//     <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedDefaultListId}  />
//         :
//     !defaultTasksListsIds.hasOwnProperty(selectedDefaultListId)
//         ?
//     <NewTaskInput onSave = {onCreateTask} selectedListId = {selectedUserListId} />
//         :
//     null
// }
