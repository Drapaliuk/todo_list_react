import React from 'react'
import { batch, useDispatch, useSelector } from 'react-redux';
import { defaultBiography, defaultSettings, isInitialized, updateSettings, logOut, selectListFromFolder,
         saveNewList, selectTasksList, defaultTasks, selectAppList, clearPersonalData, createFolder, createListInFolder, selectFolder } from '../../../redux/actions';
import { getAmountTasksForAppLists, getSelectedListId, getSelectedListsIds, getTasksFolders } from '../../../redux/selectors';
import { CreateNewList, DefaultAppLabels, Header, TasksListLabel } from '.';
import { FiPlus } from 'react-icons/fi'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { BsClipboard } from 'react-icons/bs'
import classNames from 'classnames';
import { CreateNewFolder } from './create_new_folder/CreateNewFolder';
import { FolderLabel } from './folder_label/FolderLabel';

export function Bar({tasksLists, currentTheme, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const selectedListId = useSelector(state => getSelectedListId(state));
    const folders = useSelector(state => getTasksFolders(state))
    const {selectedUserListId, selectedDefaultListId} = useSelector(state => getSelectedListsIds(state))
    const [isVisibleNewListInput, setVisibleNewListInput] = React.useState(false);
    const [isVisibleNewFolderInput, setVisibleNewFolderInput] = React.useState(false);
    const lastOpenedFolderID = useSelector(state => state.organizer.lastOpenedFolderID)

    const [openedEditListId, setOpenEditListId] = React.useState('')


    const appListTaskAmounts = useSelector(state => getAmountTasksForAppLists(state))
    
    const onVisibleNewList = () => setVisibleNewListInput(!isVisibleNewListInput)
    const onVisibleNewFolder = () => setVisibleNewFolderInput(!isVisibleNewFolderInput)
    
    const onSaveNewList = newListName => dispatch(saveNewList(newListName))
    const onCreateListInFolder = belongToFolder => newListName  => dispatch(createListInFolder(newListName, belongToFolder))
    const onSaveNewFolder = newFolderName => dispatch(createFolder(newFolderName))
    const onSelectFolder = folderID => () => dispatch(selectFolder(folderID))
    


    const onSelectUserList = listID => () => dispatch(selectTasksList(listID))
    const onSelectAppList = listID => () => dispatch(selectAppList(listID))
    const onSelectListFromFolder = folderID => listID => () => dispatch(selectListFromFolder(listID, folderID))
    const onThemeChange = newValue => dispatch(updateSettings({theme: newValue}))
    
    
    const onLogOut = () => {
        batch(() => {
            dispatch(defaultTasks())
            dispatch(defaultBiography())
            dispatch(defaultSettings())
            dispatch(clearPersonalData())
            dispatch(isInitialized())
            dispatch(logOut())
        })
        
    };

    return (
        <section className = {classNames('bar-section', {
            'bar-section_theme_dark': currentTheme === 'dark',
            'bar-section_invisible': !isVisibleInMobVer
            })}>
            <Header onThemeChange = {onThemeChange} currentTheme = {currentTheme} onLogOut = {onLogOut} />
            <ul class="bar-section__labels-list">
                <DefaultAppLabels appListTaskAmounts = {appListTaskAmounts} onSelectList = {onSelectAppList} selectedListId = {selectedListId} />
           
                {
                  folders.map(folder => {
                    return  <FolderLabel tasksLists = {folder.tasksLists} onSelectListFromFolder = {onSelectListFromFolder(folder._id)}
                                         selectedUserListId = {selectedUserListId} openedEditListId = {openedEditListId}
                                         setOpenEditListId = {setOpenEditListId} name = {folder.name} 
                                         onCreateListInFolder = {onCreateListInFolder(folder._id)}
                                         onSelect = {onSelectFolder(folder._id)}
                                         isLastOpenedFolderID = {lastOpenedFolderID === folder._id}
                                         isVisibleNewListInput = {isVisibleNewListInput}
                                         onVisibleNewList = {onVisibleNewList}
                            />
                  })  
                }
                {
                    tasksLists.map(({name, tasks, _id}) => {
                        const tasksAmount = tasks.filter(task => !task.hasDone).length
                        return <TasksListLabel key = {_id}
                                               id = {_id}
                                               name = {name} 
                                               tasksAmount = {tasksAmount} 
                                               onSelectList = {onSelectUserList}
                                               isThisListSelected = {selectedUserListId === _id}
                                               selectedListId = {selectedUserListId}
                                               isOpenedEditMenu = {_id === openedEditListId}
                                               onOpenEditMenu = {setOpenEditListId}

                                />
                    })
                }
                {isVisibleNewListInput && !lastOpenedFolderID &&
                    <CreateNewList onVisibleNewList = {onVisibleNewList} onSave = {onSaveNewList} onVisible = {onVisibleNewList} />}
                {isVisibleNewFolderInput &&
                    <CreateNewFolder onSave = {onSaveNewFolder} onVisible = {onVisibleNewFolder} />}
                    
            </ul>
            <div className = 'add-label-wrapper'>
                <button onClick = {onVisibleNewFolder} class="bar-section__add-new-folder-btn">
                    <AiOutlineFolderAdd className = {classNames('bar-section__add-new-folder-icon', {'bar-section__add-new-folder-icon_active': isVisibleNewFolderInput})}  />
                </button>
                <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">
                    <BsClipboard className = {classNames('bar-section__add-new-list-icon', {'bar-section__add-new-list-icon_active': isVisibleNewListInput})} />
                </button>
            </div>                

            
        </section>
)
}