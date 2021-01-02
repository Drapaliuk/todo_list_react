import React from 'react'
import { batch, useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { defaultBiography, defaultSettings, isInitialized } from '../../../../redux/actions';
import { logOut } from '../../../../redux/actions/authorization';
import { saveNewList, selectTasksList, defaultTasks } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId, getTasksLists } from '../../../../redux/selectors';
import { CreateNewList, DefaultAppLabels, Header, TasksListLabel } from './components'

export function Bar({isCreatedTasksLists, tasksLists}) {
    const dispatch = useDispatch();
    // const history = useHistory()
    // const location = useLocation()
    // const params = useParams()

    const selectedListId = useSelector(state => getSelectedListId(state))
    const [isVisibleNewList, setVisibleNewList] = React.useState(false);

    const onVisibleNewList = () => setVisibleNewList(!isVisibleNewList)
    const onSaveNewList = newListName => dispatch(saveNewList(newListName))
    const onSelectList = (listId, isDefaultAppList) => () => dispatch(selectTasksList(listId, isDefaultAppList))
    
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
        <section class="bar-section bar-section_theme_dark">
            <Header onLogOut = {onLogOut} />

            <ul class="bar-section__labels-list">
                <DefaultAppLabels onSelectList = {onSelectList} selectedListId = {selectedListId} />
                
                {
                    isCreatedTasksLists
                    &&
                    tasksLists.map(({name, tasks, _id}) => {
                        const tasksAmount = tasks.filter(task => !task.hasDone).length
                        return <TasksListLabel key = {_id}
                                               id = {_id} 
                                               name = {name} 
                                               tasksAmount = {tasksAmount} 
                                               onSelectList = {onSelectList}
                                               selectedListId = {selectedListId}
                                />
                    })
                }
                {isVisibleNewList && 
                    <CreateNewList onSave = {onSaveNewList}
                                   onVisible = {onVisibleNewList}
                                   />
                }
            {/* <button onClick = {() => {push('/tasks/2')}}>on redirect</button> */}

            </ul>
            <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">+</button>
        </section>
)
}