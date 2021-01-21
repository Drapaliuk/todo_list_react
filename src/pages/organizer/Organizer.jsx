import React from 'react'
import { useSelector } from 'react-redux';
import { getSelectedTaskId, getSelectedTaskProperty,
         getTasksLists,
         getSelectedListProperty,
         getTasks} from '../../redux/selectors';

import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { TasksList, TaskFullInfo, Bar } from '../../components';

export function Organizer() {
    const location = useLocation()
    const mobileVersionVisiblePage = {
        bar: location.pathname === '/app',
        list: location.pathname === '/app/list',
        settings: location.pathname === '/app/settings'
    }

    const isSelectedTask = useSelector(state => getSelectedTaskId(state));
    const selectedTask = useSelector(state => getSelectedTaskProperty(state))
    const tasksLists = useSelector(state => getTasksLists(state));
    const currentTheme = useSelector(state => state.settings.theme);
    const isLostConnection = useSelector(state => state.initialize.isLostConnection)

    const tasksListData = useSelector(state => {
        if(state.organizer.isSelectedAppList) {
            return {...getTasks(state), title: getSelectedListProperty(state, 'title')}
        }
        return {...getTasks(state), title: getSelectedListProperty(state, 'name')}
    })

    return (
        <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
            {/* {isLostConnection && <div>LOST</div>} */}
            <Bar {...{isVisibleInMobVer: mobileVersionVisiblePage.bar, currentTheme, tasksLists}} />
            <TasksList {...{isVisibleSettingsInMobVer: mobileVersionVisiblePage.settings,
                            isVisibleInMobVer: mobileVersionVisiblePage.list,
                            isSelectedTask, currentTheme, tasksListData}}
                    />
            {
                isSelectedTask 
                    && 
                <TaskFullInfo {...{isMobileVer: false, currentTheme, selectedTask, tasksLists }}/>
            }
        </div>
    )
}