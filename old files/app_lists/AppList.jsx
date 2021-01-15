import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTask, selectTask } from '../../../../redux/actions';
import { getSelectedAppListData, getTasksForDefaultAppList } from '../../../../redux/selectors';
import { AppListSorting } from './components';
import { UncompletedTasksList } from '../todo_list/components/uncompleted_tasks_list/UncompletedTasksList';
import { CompletedTasksList } from '../todo_list/components';

import classNames from 'classnames';

export function AppList({currentTheme, isVisibleInMobVer}) {
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
    
    const tasks = useSelector(state => getTasksForDefaultAppList(state, selectedAppListData))
    const uncompletedTasks = tasks.uncompletedTasks.sort(sortHandler)
    const completedTasks = tasks.completedTasks.sort(sortHandler)

    const onSelectTask = (taskId, selectedListId) => () => dispatch(selectTask(taskId, selectedListId))
    const onComplete =  (selectedListId, selectedTaskId) => isComplete => dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))


    const onSortTasks = newSortCriteria => setSortCriteria(newSortCriteria);
    const onSortOrder = newSortOrder => setSortOrder(newSortOrder);
    const onPinTask =  (selectedListId, selectedTaskId, isPinned) => dispatch(changeTask(selectedListId, selectedTaskId, {isPinned: isPinned}))
    const onMakeImportant =  (selectedListId, selectedTaskId, isImportant) => dispatch(changeTask(selectedListId, selectedTaskId, {isImportant: isImportant}))



    return (
        <section className = {classNames('todo-section', {
                'todo-section_theme_dark': currentTheme === 'dark',
                'todo-section_invisible': isVisibleInMobVer
                })}>
            <h1>{selectedAppListData.title}</h1>
            <Fragment>
                <UncompletedTasksList uncompletedTasks = {uncompletedTasks} 
                                      onComplete = {onComplete} 
                                      onSelectTask = {onSelectTask} 
                                      onPin = {onPinTask}
                                      onMakeImportant = {onMakeImportant}
                                    />
                {
                    completedTasks.length > 0 &&
                    <CompletedTasksList completedTasks = {completedTasks} 
                                        onSelectTask = {onSelectTask}
                                        onComplete = {onComplete} />
                }
                <AppListSorting onSortTasks = {onSortTasks} 
                                onSortOrder = {onSortOrder} 
                                currentSortOrder = {sortOrder}  
                                currentSortCriteria = {sortCriteria} />
            </Fragment>
        </section>
    )



    // return (
    //     <section className = {classNames('todo-section', {
    //             'todo-section_theme_dark': currentTheme === 'dark',
    //             'todo-section_invisible': isVisibleInMobVer
    //             })}>
    //         <h1>{selectedAppListData.title}</h1>
    //         <Fragment>
    //             <UncompletedTasksList uncompletedTasks = {uncompletedTasks} 
    //                                   onComplete = {onComplete} 
    //                                   onSelectTask = {onSelectTaskFromAppList} 
    //                                   onPin = {onPinTask}
    //                                   onMakeImportant = {onMakeImportant}
    //                                 />
    //             {
    //                 completedTasks.length > 0 &&
    //                 <CompletedTasksList completedTasks = {completedTasks} 
    //                                     onSelectTask = {onSelectTaskFromAppList}
    //                                     onComplete = {onComplete} />
    //             }
    //             <AppListSorting onSortTasks = {onSortTasks} 
    //                             onSortOrder = {onSortOrder} 
    //                             currentSortOrder = {sortOrder}  
    //                             currentSortCriteria = {sortCriteria} />
    //         </Fragment>
    //     </section>
    // )

}