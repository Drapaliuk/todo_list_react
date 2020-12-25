import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveNewList, selectTasksList } from '../../../../redux/actions/tasks/tasks';
import { getTasksLists } from '../../../../redux/selectors';
import { CreateNewList, DefaultAppLabels, FolderLabels, Header, Notification, TasksListLabel } from './components'

export function Bar() {
    const dispatch = useDispatch();
    const [isVisibleNewList, setVisibleNewList] = React.useState(false);
    const [newListName, setNewListName] = React.useState('');
    const tasksLists = useSelector(state => getTasksLists(state));

    const onVisibleNewList = () => setVisibleNewList(!isVisibleNewList)
    const onSaveNewList = () => dispatch(saveNewList(newListName))
    const onSelectList = listId => () => dispatch(selectTasksList(listId))


    return (
        <section class="bar-section bar-section_theme_dark">
            <Header />
            {/* <Notification /> */}

            <ul class="bar-section__labels-list">
                <DefaultAppLabels />
                {/* <FolderLabels /> */}
                {
                    tasksLists.map(({name, tasks, _id}) => {
                        return <TasksListLabel id = {_id} 
                                               name = {name} 
                                               tasksAmount = {tasks.length} 
                                               onSelectList = {onSelectList}
                                />
                    })
                }
                {isVisibleNewList && 
                    <CreateNewList newListName = {newListName} 
                                   setNewListName = {setNewListName} 
                                   onSaveNewList = {onSaveNewList}/>
                }
            </ul>
            <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">+</button>
        </section>
)
}