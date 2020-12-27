import React from 'react'
import { useSelector } from 'react-redux';
import { getSelectedTask, getSelectedTaskId } from '../../redux/selectors';
import {Bar, TodoList, FullInfo} from './components';
import classNames from 'classnames';

export function Application() {
const isSelectedTask = useSelector(state => getSelectedTaskId(state));
return (
    <div class= {classNames("container", {'container_full_info_closed': !isSelectedTask})}>
        <Bar />
        <TodoList />
        
        {isSelectedTask && <FullInfo />}
    </div>
)
}