import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask } from '../../../../redux/actions';
import { getSelectedListId, getCompletedTasks, getUncompletedTasks, getSelectedListSettings, getSelectedListProperty } from '../../../../redux/selectors';
import { NewTaskInput } from './components/new_task_input/NewTaskInput';
import { ProfileSettings } from '../../../settings/ProfileSettings';
import { UncompletedTasksList, CompletedTasksList, EditListLabelDesktop, TodoListSettings } from './components'
 
import classNames from 'classnames';
import { MobileNav } from '../common/mobile_nav/mobile_nav';


export function TodoList({tasksListData, isCreatedTasksLists, currentTheme, isSelectedTask, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const {uncompletedTasks, completedTasks, isSelectDefaultAppList, title} = tasksListData;
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sortBy'));
    const selectedListId = useSelector(state => getSelectedListId(state));

    const onSelectTask = (taskId, selectedListId) => () => dispatch(selectTask(taskId, selectedListId))
    const onComplete =  (selectedListId, selectedTaskId) => isComplete => dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
    
    const onPinTask =  (isPinned, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isPinned: isPinned}))
    const onMakeImportant =  (isImportant, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isImportant: isImportant}))
    const onSortTasks = sortBy => dispatch(changeListSettings(selectedListId, {'sortBy': sortBy}))
    const onSaveTask = text => dispatch(saveNewTask(selectedListId, text))

    return (
        <section className = {classNames('todo-section', {
            'todo-section_theme_dark': currentTheme === 'dark',
            'todo-section_invisible': !isVisibleInMobVer
            })}>
            <MobileNav partName = {'selectedListName'} />
            <h2 className ='todo-list__title'>{title}</h2>
            {
                !isSelectDefaultAppList 
                    &&
                <NewTaskInput onSave = {onSaveTask} selectedListId = {selectedListId}  />
            }
            
            <Route exact path = '/app/edit-list' component = {EditListLabelDesktop} />
            <Route path = '/app/settings' component = {ProfileSettings} />
            {
                isCreatedTasksLists
                &&
                <Fragment>
                    <UncompletedTasksList uncompletedTasks = {uncompletedTasks} 
                                          onComplete = {onComplete} 
                                          onSelectTask = {onSelectTask} 
                                          onPin = {onPinTask}
                                          onMakeImportant = {onMakeImportant}
                                          isSelectedTask = {isSelectedTask}
                                        />
                    {
                        completedTasks.length > 0 &&
                        <CompletedTasksList completedTasks = {completedTasks} 
                                            onSelectTask = {onSelectTask}
                                            onComplete = {onComplete}
                                    />
                    }
                    {
                        !isSelectDefaultAppList &&
                        <TodoListSettings onSortTasks = {onSortTasks} 
                                          currentSortCriteria = {currentSortCriteria}
                                            />
                    }
                    
                </Fragment>
            }
           
        </section>
    )
}