import React from 'react'
import { batch, useDispatch, useSelector } from 'react-redux';
import { defaultBiography, defaultSettings, isInitialized, updateSettings, logOut,
         saveNewList, selectTasksList, defaultTasks, selectAppList, clearPersonalData } from '../../../../redux/actions';
import { getAmountTasksForAppLists, getSelectedListId } from '../../../../redux/selectors';
import { CreateNewList, DefaultAppLabels, Header, TasksListLabel } from './components';
import { FiPlus } from 'react-icons/fi';
import classNames from 'classnames';

export function Bar({isCreatedTasksLists, tasksLists, currentTheme, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const selectedListId = useSelector(state => getSelectedListId(state));
    const [isVisibleNewListInput, setVisibleNewListInput] = React.useState(false);

    const appListTaskAmounts = useSelector(state => getAmountTasksForAppLists(state))
    
    const onVisibleNewList = () => setVisibleNewListInput(!isVisibleNewListInput)
    const onSaveNewList = newListName => dispatch(saveNewList(newListName))
    const onSelectUserList = listId => () => dispatch(selectTasksList(listId))
    const onSelectAppList = listId => () => dispatch(selectAppList(listId))
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
                    isCreatedTasksLists
                    &&
                    tasksLists.map(({name, tasks, _id}) => {
                        const tasksAmount = tasks.filter(task => !task.hasDone).length
                        return <TasksListLabel key = {_id}
                                               id = {_id} 
                                               name = {name} 
                                               tasksAmount = {tasksAmount} 
                                               onSelectList = {onSelectUserList}
                                               selectedListId = {selectedListId}
                                />
                    })
                }
                {isVisibleNewListInput && 
                    <CreateNewList onSave = {onSaveNewList}
                                   onVisible = {onVisibleNewList}
                                   />
                }
            </ul>
            <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">
                <FiPlus className = {classNames('bar-section__add-new-folder-icon', {'bar-section__add-new-folder-icon_active': isVisibleNewListInput})} />
            </button>
        </section>
)
}