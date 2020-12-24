import React from 'react'
import { useDispatch } from 'react-redux';
import { CreateNewList, DefaultAppLabels, FolderLabels, Header, Notification, TasksLitsLabel } from './components'

export function Bar() {
    const dispatch = useDispatch();
    const [isVisibleNewList, setVisibleNewList] = React.useState(false);
    const [newListName, setNewListName] = React.useState('');

    const onVisibleNewList = () => setVisibleNewList(!isVisibleNewList)
    const onSaveNewList = () => dispatch()

    return (
        <section class="bar-section bar-section_theme_dark">
            <Header />
            {/* <Notification /> */}

            <ul class="bar-section__labels-list">
                <DefaultAppLabels />
                {/* <FolderLabels /> */}
                <TasksLitsLabel />
                {isVisibleNewList && <CreateNewList newListName = {newListName} setNewListName = {setNewListName} />}
            </ul>
            <button onClick = {onVisibleNewList} class="bar-section__add-new-folder-btn">+</button>
        </section>
)
}