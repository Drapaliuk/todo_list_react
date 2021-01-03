import React from 'react'
import { batch, useDispatch, useSelector } from 'react-redux';
import { defaultBiography, defaultSettings, isInitialized, updateSettings } from '../../../../redux/actions';
import { logOut } from '../../../../redux/actions/authorization';
import { saveNewList, selectTasksList, defaultTasks, selectAppList } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId } from '../../../../redux/selectors';
import { CreateNewList, DefaultAppLabels, Header, TasksListLabel } from './components'
import { ThemeSwitcher } from './components/ThemeSwitcher';
import classNames from 'classnames';


export function Bar({isCreatedTasksLists, tasksLists, currentTheme}) {
    const dispatch = useDispatch();
    const selectedListId = useSelector(state => getSelectedListId(state))
    const [isVisibleNewList, setVisibleNewList] = React.useState(false);

    const onVisibleNewList = () => setVisibleNewList(!isVisibleNewList)
    const onSaveNewList = newListName => dispatch(saveNewList(newListName))
    const onSelectUserList = listId => () => dispatch(selectTasksList(listId))
    const onSelectAppList = listId => () => dispatch(selectAppList(listId))
    const onThemeChange = newValue => dispatch(updateSettings({theme: newValue}))
    
    const onLogOut = () => {
        batch(() => {
            dispatch(defaultTasks())
            dispatch(defaultBiography())
            dispatch(defaultSettings())
            dispatch(isInitialized())
            dispatch(logOut())
        })
        
    };

    

    return (
        <section className = {classNames('bar-section', {'bar-section_theme_dark': currentTheme === 'dark'})} class="bar-section">
            <Header onThemeChange = {onThemeChange} currentTheme = {currentTheme} onLogOut = {onLogOut} />
            <ul class="bar-section__labels-list">
                <DefaultAppLabels onSelectList = {onSelectAppList} selectedListId = {selectedListId} />
                
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
                {isVisibleNewList && 
                    <CreateNewList onSave = {onSaveNewList}
                                   onVisible = {onVisibleNewList}
                                   />
                }
            </ul>
            <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">+</button>
        </section>
)
}