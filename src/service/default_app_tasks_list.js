import { FcCalendar } from 'react-icons/fc';
import { AiOutlineStar } from 'react-icons/ai';


export const defaultAppLists = [
    {
        title: 'today',
        id: 'DL_today',
        Icon: FcCalendar,
        filterHandler: tasks => tasks.filter(task => !task.hasDone)
    },
    {
        title: 'week',
        id: 'DL_week',
        Icon: FcCalendar,
        filterHandler: lists => {
            const allTasks = lists.reduce((acc, list) => {
                acc = [...acc, list.tasks]
                return acc
            }, [])

            return allTasks.filter(task => !task.hasDone)
        }

    },
    {
        title: 'important',
        id: 'DL_week',
        Icon: AiOutlineStar,
        filterHandler: lists => {
            const allTasks = lists.reduce((acc, list) => {
                acc = [...acc, list.tasks]
                return acc
            }, [])

            return allTasks.filter(task => task.isImportant)
        }
    }
]