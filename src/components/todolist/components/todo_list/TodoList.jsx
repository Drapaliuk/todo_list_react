import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom'
import { changeListSettings, changeTask, saveNewTask, selectTask } from '../../../../redux/actions';
import { getSelectedListId, getCompletedTasks, getUncompletedTasks, getSelectedListSettings, getSelectedListProperty } from '../../../../redux/selectors';
import { NewTaskInput } from './components/new_task_input/NewTaskInput';
import { ProfileSettings } from '../../../settings/ProfileSettings';
import { UncompletedTasksList, CompletedTasksList, EditListLabelDesktop, TodoListSettings } from './components'
 
import classNames from 'classnames';
import { ThemeSwitcher } from '../bar/components';
import { MobileNav } from '../common/mobile_nav/mobile_nav';


export function TodoList({isCreatedTasksLists, currentTheme, isSelectedTask, isVisibleInMobVer}) {
    const dispatch = useDispatch();
    const currentSortCriteria = useSelector(state => getSelectedListSettings(state, 'sortBy'));
    const selectedListName = useSelector(state => getSelectedListProperty(state, 'name'))

    const isSelectedDefaultList = useSelector(state => state.tasks.isSelectedDefaultList) //!
    const selectedListId = useSelector(state => getSelectedListId(state));
    const uncompletedTasks = useSelector(state => getUncompletedTasks(currentSortCriteria, isSelectedDefaultList, selectedListId)(state));
    const completedTasks = useSelector(state => getCompletedTasks(state));

    const onSelectTask = id => () => dispatch(selectTask(id))
    const onComplete =  (isComplete, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {hasDone: isComplete}))
    const onPinTask =  (isPinned, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isPinned: isPinned}))
    const onMakeImportant =  (isImportant, selectedTaskId) => dispatch(changeTask(selectedListId, selectedTaskId, {isImportant: isImportant}))
    const onSortTasks = sortBy => dispatch(changeListSettings(selectedListId, {'sortBy': sortBy}))
    const onSaveTask = text => dispatch(saveNewTask(selectedListId, text))

    return (
        <section className = {classNames('todo-section', {
            'todo-section_theme_dark': currentTheme === 'dark',
            'todo-section_invisible': !isVisibleInMobVer
            })}>
            <MobileNav partName = {selectedListName} />
            <h2>{selectedListName}</h2>
            <NewTaskInput onSave = {onSaveTask} selectedListId = {selectedListId}  />
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
                    
                    <TodoListSettings onSortTasks = {onSortTasks} 
                                      currentSortCriteria = {currentSortCriteria}
                                      />
                </Fragment>
            }
           
        </section>
    )
}