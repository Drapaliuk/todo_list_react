import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTask, selectTaskFromAppList } from '../../../../redux/actions';
import { getSelectedAppListData, getTaskByCreationDate } from '../../../../redux/selectors';
import { UncompletedTasksList, AppListSorting } from './components';
import { CompletedTasksList } from '../todo_list/components';

import classNames from 'classnames';

export function AppList({currentTheme}) {
    React.useEffect(() => {}, [])
    const dispatch = useDispatch();
    const [sortCriteria, setSortCriteria] = React.useState('isPinned')
    const [sortOrder, setSortOrder] = React.useState('asc')
    const selectedAppListData = useSelector(state => getSelectedAppListData(state));
    const sortHandler = (valueA, valueB) => {
        if(sortOrder === 'asc') {
            if(valueA[sortCriteria] < valueB[sortCriteria]) return 1
            if(valueA[sortCriteria] > valueB[sortCriteria]) return -1
            return 0
        }

        if(valueA[sortCriteria] > valueB[sortCriteria]) return 1
        if(valueA[sortCriteria] < valueB[sortCriteria]) return -1
        return 0
    }
    
    const tasks = useSelector(state => getTaskByCreationDate(state, selectedAppListData.id))
    const uncompletedTasks = tasks.uncompletedTasks.sort(sortHandler)
    const completedTasks = tasks.completedTasks.sort(sortHandler)

    const onSelectTaskFromAppList = (listId, taskId) => () => dispatch(selectTaskFromAppList(listId, taskId))
    const onSortTasks = newSortCriteria => setSortCriteria(newSortCriteria);
    const onSortOrder = newSortOrder => setSortOrder(newSortOrder);
    const onComplete =  (selectedListId, selectedTaskId, isComplete, ) => dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
    const onPinTask =  (selectedListId, selectedTaskId, isPinned) => dispatch(changeTask(selectedListId, selectedTaskId, {isPinned: isPinned}))
    const onMakeImportant =  (selectedListId, selectedTaskId, isImportant) => dispatch(changeTask(selectedListId, selectedTaskId, {isImportant: isImportant}))


    return (
        <section className = {classNames('todo-section', {'todo-section_theme_dark': currentTheme === 'dark'})}>
            <h1>{selectedAppListData.title}</h1>
            <Fragment>
                <UncompletedTasksList uncompletedTasks = {uncompletedTasks} 
                                      onComplete = {onComplete} 
                                      onSelectTask = {onSelectTaskFromAppList} 
                                      onPin = {onPinTask}
                                      onMakeImportant = {onMakeImportant}
                                    />
                {
                    completedTasks.length > 0 &&
                    <CompletedTasksList completedTasks = {completedTasks} 
                                        onSelectTask = {onSelectTaskFromAppList}
                                        onComplete = {onComplete} />
                }
                <AppListSorting onSortTasks = {onSortTasks} 
                                onSortOrder = {onSortOrder} 
                                currentSortOrder = {sortOrder}  
                                currentSortCriteria = {sortCriteria} />
            </Fragment>
        </section>
    )

}