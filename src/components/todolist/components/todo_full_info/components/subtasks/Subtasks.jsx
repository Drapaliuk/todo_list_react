import React from 'react'
import { KEY_ENTER } from '../../../../../../service'
import { SubTask } from '../subtask/SubTask';
import { RiArrowDownSLine, RiArrowUpSLine, RiArrowUpLine, RiCloseLine, RiFilterLine } from 'react-icons/ri';
import { AiOutlineSortAscending,  AiOutlineSortDescending} from 'react-icons/ai'
import { VscSearchStop, VscSearch } from 'react-icons/vsc';
import classNames from 'classnames';

export function Subtasks({subtasks, onCreate, onUpdateText, onComplete, onDelete}) {
    const [text, writeText] = React.useState('')
    const [openedSubtaskId, setOpenFullText] = React.useState('');
    const [isVisibleList, setVisibleSubtasksList] = React.useState(false); 
    const [isVisibleSorting, setVisibleSubtasksSorting] = React.useState(false); 
    const [isVisibleSearchInput, setVisibleSearchInput] = React.useState(false); 

    const onOpenSubtask = id => setOpenFullText(id)
    const visibleSubtasksListHandler = () => setVisibleSubtasksList(!isVisibleList);
    const visibleSubtasksSortingHandler = () => setVisibleSubtasksSorting(!isVisibleSorting);
    const visibleSearchInputHandler = () => setVisibleSearchInput(!isVisibleSearchInput)
    const inVisibleSearchInputHandler = () => setVisibleSearchInput(false)

    
    const createHandler = () => {
        onCreate(text)
        writeText('')
    }

    const keyboardCreateHandler = ({keyCode}) => {
        if(keyCode === KEY_ENTER) {
            createHandler()
        }
    }
    const onWriteText = event => writeText(event.target.value)

    return (
        <div class="todo-subtasks">
            <div class="todo-subtasks__add-form">
                <button onClick = {createHandler} class="todo-subtasks__add-form-btn">+</button>
                <input onKeyDown = {keyboardCreateHandler} 
                       onChange = {onWriteText} 
                       class="todo-subtasks__add-form-input" 
                       type="text" 
                       placeholder="add subtask"
                       value = {text}
                />
            </div>
            
            {
                subtasks.length > 0 &&
                <button onClick = {visibleSubtasksListHandler} className = {classNames('subtasks__open-btn', {'subtasks__open-btn_open': isVisibleList})}>
                    <span>{subtasks.length}</span>
                    <span>Subtasks</span>
                    {isVisibleList ? <RiArrowDownSLine className = 'subtasks__open-icon' /> : <RiArrowUpSLine className = 'subtasks__open-icon' />}
                </button>
            }
            {
                isVisibleList && subtasks.length > 0 &&
                <ul class="todo-subtasks__list">
                    { subtasks.map(({_id, text, hasDone}) => <SubTask key = {_id}
                                                               id = {_id} 
                                                               onDelete = {onDelete}
                                                               onComplete = {onComplete} 
                                                               text = {text}
                                                               onOpen = {onOpenSubtask}
                                                               isOpen = {_id === openedSubtaskId}
                                                               hasDone = {hasDone}
                                                               onUpdateText = {onUpdateText} />) }
                    <li className = 'subtasks__settings-options'>
                        {
                            isVisibleSorting && !isVisibleSearchInput &&
                            <div className = 'subtasks__sort-by'>
                                <button className="subtasks__sort-by-item">
                                    <AiOutlineSortAscending className = 'subtasks__settings-icon' />
                                </button>
                                <button className="subtasks__sort-by-item">
                                    <AiOutlineSortDescending className = 'subtasks__settings-icon' />
                                </button>
                                <button onClick = {visibleSearchInputHandler} className="subtasks__sort-by-item">
                                    <VscSearch className = 'subtasks__settings-icon' />
                                </button>
                            </div>
                          
                        }
                        {
                            isVisibleSearchInput &&
                            <div className = 'subtasks__search-wrapper'>
                                <button onClick = {inVisibleSearchInputHandler} className = 'subtasks__search-stop'>
                                    <VscSearchStop className = 'subtasks__settings-icon' />
                                </button>
                                <input className = 'subtasks__search-input' placeholder = 'search' />
                            </div>
                        }


                        <div className = 'subtasks__option-container'>
                            <button className = 'subtasks__settings-option'>
                                <RiArrowUpLine className = 'subtasks__settings-icon' />
                            </button>
                            <button onClick = {visibleSubtasksSortingHandler} className = 'subtasks__settings-option'>
                                <RiFilterLine className = 'subtasks__settings-icon' />
                            </button>
                            <button className = 'subtasks__settings-option' onClick = {visibleSubtasksListHandler}>
                                <RiCloseLine className = 'subtasks__settings-icon' />
                            </button>
                        </div>
                    </li>
                </ul>
            }
            
            

        </div>
    )
}
