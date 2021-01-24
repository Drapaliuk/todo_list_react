import { FcCalendar } from 'react-icons/fc';
import { AiOutlineStar } from 'react-icons/ai';
import { SortByDatesCreation } from '../../utils';
import { defaultTasksListsIds } from '../constants/constants';


const filterHandlers = new SortByDatesCreation('monday')



export const appListsData = [
    {
        title: 'Today',
        id: defaultTasksListsIds.DEFAULT_LIST__today,
        Icon: FcCalendar,
        filterHandler: task => {
            return filterHandlers.compareTwoDates.call(filterHandlers, task.dateCreation, Date.now())
        }
    },
    {
        title: 'Week',
        id: defaultTasksListsIds.DEFAULT_LIST__week,
        Icon: FcCalendar,
        filterHandler: task => {
            return filterHandlers.isThisWeek.call(filterHandlers, task.dateCreation, Date.now())
        }

    },
    {
        title: 'Important',
        id: defaultTasksListsIds.DEFAULT_LIST__important,
        Icon: AiOutlineStar,
        filterHandler: task => task.isImportant
    }
]