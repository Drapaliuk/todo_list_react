import React from 'react'
import { FcFolder, FcOpenedFolder } from 'react-icons/fc'
import { TasksListLabel } from '..'
import { CreateNewList } from '../create_new_list/CreateNewList'




export function FolderLabel(props) {
    const {tasksLists, onSelectListFromFolder, selectedUserListId, onSelect,
           openedEditListId, setOpenEditListId, name, isVisibleNewListInput,
           onCreateListInFolder, isLastOpenedFolderID, onVisibleNewList} = props



    const [isOpen, setOpen] = React.useState(false) 
    const onFolderOpen = () => setOpen(!isOpen)
    const selectFolderHandler = () => {
        // if(!isOpen) {
            onSelect()
        // }
    }
    return (
        <li onClick = {selectFolderHandler} class="bar-section__labels-list-item bar-section__labels-list-item_folder_wrapper">
            <div onClick = {onFolderOpen} class="todo-lists-folder todo-list-label todo-list-label_with_correct_btn">
                {isOpen ? <FcOpenedFolder className="todo-list-label__icon" />
                        : <FcFolder className="todo-list-label__icon" />}
                <span class="folder name">{name}</span>
                <button class="todo-list-label__correct-btn">
                    <svg class="todo-list-label__icon">
                        <use href="./src/img/sprite.svg#icon-pen"></use>
                    </svg>
                    
                </button>
            </div>
            {
            isOpen &&
            <>
            <ul class=" todo-lists-folder__inner-list">
                {tasksLists.map(({name, tasks, _id}) => {
                    const tasksAmount = tasks.filter(task => !task.hasDone).length
                    return <TasksListLabel key = {_id}
                                        id = {_id}
                                        name = {name} 
                                        tasksAmount = {tasksAmount} 
                                        onSelectList = {onSelectListFromFolder}
                                        isThisListSelected = {selectedUserListId === _id}
                                        selectedListId = {selectedUserListId}
                                        isOpenedEditMenu = {_id === openedEditListId}
                                        onOpenEditMenu = {setOpenEditListId}

                            />
                })}
            </ul>

            {isVisibleNewListInput && isLastOpenedFolderID && 
             <CreateNewList onSave = {onCreateListInFolder} onVisible = {onVisibleNewList} />}

            {/* <button className = 'folder__add-new-list' onClick = {onVisibleNewList}>+</button> */}
            </>
            }

        </li>
    )
}