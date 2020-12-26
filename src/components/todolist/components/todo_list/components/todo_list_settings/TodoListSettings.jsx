import React from 'react';
import { BsThreeDots} from 'react-icons/bs';
import { BiSort} from 'react-icons/bi';
import { SettingsPart } from './SettingsPart';
import { Sorting } from './Sorting';
import { Settings } from './Settings';


export function TodoListSettings({sortByHandler, currentSortBy}) {
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
    
    return (
        <div className="todo-list-settings">
            { isVisibleSettings && <Settings />}
            { isVisibleSorting && <Sorting sortByHandler = {sortByHandler} currentSortBy = {currentSortBy}/> }
            
            <div className="todo-list-settings__panel todo-list-settings__panel_theme_dark">
                <SettingsPart value = 'sort' Icon = {BiSort} visibleHandler = {onVisibleSorting} isVisible = {isVisibleSorting} />
                <SettingsPart value = 'more' Icon = {BsThreeDots} visibleHandler = {onVisibleSettings} isVisible = {isVisibleSettings} />
            </div>
    </div>
    )
}