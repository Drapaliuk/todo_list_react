import React from 'react'
import { ASC, DESC, KEY_ENTER } from '../../../../service'
import { SubTask } from '../subtask/SubTask';
import { RiArrowDownSLine, RiArrowUpSLine, RiArrowUpLine, RiCloseLine, RiFilterLine } from 'react-icons/ri';
import { AiOutlineSortAscending,  AiOutlineSortDescending} from 'react-icons/ai'
import { VscSearchStop, VscSearch } from 'react-icons/vsc';
import classNames from 'classnames';
import { sortHandler } from "../../../../utils";
import { SubtasksSettings } from '../subtasks_settings/SubtasksSettings';


export function Subtasks({subtasks, onCreate, onUpdateText, onComplete, onDelete, belongToList, selectedTaskId}) {
    const [isInvalidSubtaskText, setInvalidSubtaskFlag] = React.useState(false)
    const [text, writeText] = React.useState('')
    const [openedSubtaskId, setOpenFullText] = React.useState('');
    const [correctionSubtaskId, setCorrectionSubtaskId] = React.useState('');
    const [isVisibleList, setVisibleSubtasksList] = React.useState(false); 
    const [currentSortCriteria, setCurrentSortCriteria] = React.useState({sortBy: 'hasDone', order: DESC, searchByLetters: ''})

    React.useEffect(() => {
        setInvalidSubtaskFlag(false)
    }, [belongToList, selectedTaskId])


    const onOpenSubtask = id => setOpenFullText(id)
    const visibleSubtasksListHandler = () => setVisibleSubtasksList(!isVisibleList);

    const isEmptyField = !text.split(' ').some(el => el)
    const sortedSubtasks = sortHandler(currentSortCriteria.sortBy, currentSortCriteria.order, currentSortCriteria.searchByLetters)(subtasks)

    const createSubtaskByClick = () => {
        if(!isEmptyField) {
            writeText('')
            onCreate(text)
            return
        }

        if(isEmptyField) {
            writeText('')
            setInvalidSubtaskFlag(!isInvalidSubtaskText)
            return
        }
    }

    const createSubtaskByKeyboard = ({keyCode}) => {
        if(keyCode === KEY_ENTER && !isEmptyField) {
            writeText('')
            onCreate(text)
            return
        }

        if(keyCode === KEY_ENTER && isEmptyField) {
            writeText('')
            setInvalidSubtaskFlag(!isInvalidSubtaskText)
            return
        }
    }


    const onWriteText = event => {
        writeText(event.target.value)
        if(isInvalidSubtaskText) return setInvalidSubtaskFlag(false)
    }

    return (
        <div class="todo-subtasks">
            <div className = {classNames('todo-subtasks__add-form', {'todo-subtasks_invalid': isInvalidSubtaskText})} class="todo-subtasks__add-form">
                <button onClick = {createSubtaskByClick} class="todo-subtasks__add-form-btn">+</button>
                <input onKeyDown = {createSubtaskByKeyboard} 
                       onChange = {onWriteText} 
                       class="todo-subtasks__add-form-input" 
                       type="text" 
                       placeholder={isInvalidSubtaskText ? 'This field can`t be empty!' : 'add subtask'}
                       value = {text}
                />
            </div>
            
            {
                subtasks.length > 0 &&
                <button onClick = {visibleSubtasksListHandler} className = {classNames('subtasks__open-btn', {'subtasks__open-btn_open': isVisibleList})}>
                    <span>{subtasks.length}</span>
                    <span>Subtasks</span>
                    {isVisibleList ? <RiArrowUpSLine className = 'subtasks__open-icon' /> : <RiArrowDownSLine className = 'subtasks__open-icon' />}
                </button>
            }
            {
                isVisibleList && subtasks.length > 0 &&
                <ul class="todo-subtasks__list">
                    { sortedSubtasks.map(({_id, text, hasDone}) => <SubTask key = {_id}
                                                                            id = {_id} 
                                                                            onDelete = {onDelete}
                                                                            onComplete = {onComplete} 
                                                                            text = {text}
                                                                            onOpen = {onOpenSubtask}
                                                                            isOpen = {_id === openedSubtaskId}
                                                                            hasDone = {hasDone}
                                                                            setCorrectionSubtaskId = {setCorrectionSubtaskId}
                                                                            isCorrecting = {correctionSubtaskId === _id}
                                                                            onUpdateText = {onUpdateText} />) }

                    <SubtasksSettings {...{setCurrentSortCriteria, currentSortCriteria, visibleSubtasksListHandler}} />
                </ul>
            }
            
            

        </div>
    )
}
