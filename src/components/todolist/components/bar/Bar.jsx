import React from 'react'
import { batch, useDispatch, useSelector } from 'react-redux';
import { defaultBiography, defaultSettings, isInitialized } from '../../../../redux/actions';
import { logOut } from '../../../../redux/actions/authorization';
import { saveNewList, selectTasksList, defaultTasks } from '../../../../redux/actions/tasks/tasks';
import { getSelectedListId, getTasksLists } from '../../../../redux/selectors';
import { CreateNewList, DefaultAppLabels, Header, TasksListLabel } from './components'

export function Bar({isCreatedTasksLists}) {
    const dispatch = useDispatch();
    const selectedListId = useSelector(state => getSelectedListId(state))
    const [isVisibleNewList, setVisibleNewList] = React.useState(false);
    const tasksLists = useSelector(state => getTasksLists(state));

    const onVisibleNewList = () => setVisibleNewList(!isVisibleNewList)
    const onSaveNewList = newListName => dispatch(saveNewList(newListName))
    const onSelectList = listId => () => dispatch(selectTasksList(listId))
    
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
                <DefaultAppLabels />
                
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
            </ul>
            <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">+</button>
        </section>
)
}