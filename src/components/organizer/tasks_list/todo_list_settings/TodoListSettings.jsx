import React from 'react';
import { BsThreeDots} from 'react-icons/bs';
import { BiSort} from 'react-icons/bi';
import { SettingsPart } from './SettingsPart';
import { Sorting } from './Sorting';
import { Settings } from './Settings';


export function TodoListSettings({onSortTasks, currentSortCriteria, onVisibleSearchTaskInput}) {
    
    const [isVisibleSorting, setVisibleSorting] = React.useState(false);
    const [isVisibleSettings, setVisibleSettings] = React.useState(false);
    
    const onVisibleSorting = () => {
        setVisibleSorting(!isVisibleSorting)
        setVisibleSettings(false)
    }

    const onVisibleSettings = () => {
        setVisibleSettings(!isVisibleSettings)
        setVisibleSorting(false)
    }
    
    const sortByHandler = sort => () => {
        if(sort.sortBy === currentSortCriteria.sortBy) return onSortTasks({sortBy: '', order: ''})
        onSortTasks(sort)
    }

    const sortOrderHandler = (sortBy, order) => () => onSortTasks({sortBy, order})



    return (
        <div className="todo-list-settings">
            { isVisibleSettings && <Settings />}
            { isVisibleSorting &&
            //   currentSortCriteria.sortBy !== 'searchByLetters' &&
              <Sorting {...{sortOrderHandler, sortByHandler, currentSortCriteria, onVisibleSearchTaskInput}} /> }
            
            <div className="todo-list-settings__panel todo-list-settings__panel_theme_dark">
                <SettingsPart value = 'sort' 
                              Icon = {BiSort} 
                              visibleHandler = {onVisibleSorting} 
                              isVisible = {isVisibleSorting} />

                <SettingsPart value = 'more' 
                              Icon = {BsThreeDots} 
                              visibleHandler = {onVisibleSettings} 
                              isVisible = {isVisibleSettings} />
            </div>
    </div>
    )
}