import { FcCalendar } from 'react-icons/fc';
import { AiOutlineStar } from 'react-icons/ai';
import { SortByDatesCreation } from '../../utils';
import { DEFAULT_TASKS_LIST_TODAY, DEFAULT_TASKS_LIST_WEEK, DEFAULT_TASKS_LIST_IMPORTANT } from '../constants/constants';


const filterHandlers = new SortByDatesCreation('monday')



export const appListsData = [
    {
        title: 'Today',
        // id: 'APP_LIST_today',
        id: DEFAULT_TASKS_LIST_TODAY,
        Icon: FcCalendar,
        filterHandler: task => {
            return filterHandlers.compareTwoDates.call(filterHandlers, task.dateCreation, Date.now())
        }
    },
    {
        title: 'Week',
        // id: 'APP_LIST_week',
        id: DEFAULT_TASKS_LIST_WEEK,
        Icon: FcCalendar,
        filterHandler: task => {
            return filterHandlers.isThisWeek.call(filterHandlers, task.dateCreation, Date.now())
        }

    },
    {
        title: 'Important',
        // id: 'APP_LIST_important',
        id: DEFAULT_TASKS_LIST_IMPORTANT,
        Icon: AiOutlineStar,
        filterHandler: task => task.isImportant
    }
]