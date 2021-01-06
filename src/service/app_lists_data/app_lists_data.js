import { FcCalendar } from 'react-icons/fc';
import { AiOutlineStar } from 'react-icons/ai';
import { SortByDatesCreation } from '../../utils';
const filterHandlers = new SortByDatesCreation('monday')

export const appListsData = [
    {
        title: 'Today',
        id: 'APP_LIST_today',
        Icon: FcCalendar,
        filterHandler: task => {
            return filterHandlers.compareTwoDates.call(filterHandlers, task.dateCreation, Date.now())
        }
    },
    {
        title: 'Week',
        id: 'APP_LIST_week',
        Icon: FcCalendar,
        filterHandler: task => {
            return filterHandlers.isThisWeek.call(filterHandlers, task.dateCreation, Date.now())
        }

    },
    {
        title: 'Important',
        id: 'APP_LIST_important',
        Icon: AiOutlineStar,
        filterHandler: task => task.isImportant
    }
]