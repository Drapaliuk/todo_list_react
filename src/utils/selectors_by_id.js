export const changeListById = (lists, listId, callBack) => {
    const listsCopy = [...lists]
    return listsCopy.map(list => {
        if(list._id === listId) {
            return callBack({...list})
        }
        return list
    })
}

export const changeTaskById = (lists, listId, taskId, callBack) => {
    const logic = selectedList => {
        const changedTasks = selectedList.tasks.map(task => {
            if(task._id === taskId) {
                return callBack({...task})
            }
            return task
        })

        selectedList.tasks = [...changedTasks]
        return selectedList
    }

    return changeListById(lists, listId, logic)
}

export const changeSubTaskById = (lists, listId, taskId, subtaskId, callBack) => {
    const logic = selectedTask => {
        const changedSubtasks = selectedTask.subtasks.map(subtask => {
            if(subtask._id === subtaskId) {
                return callBack({...subtask})
            }
            return subtask
        })
        selectedTask.subtasks = [...changedSubtasks]
        return selectedTask
    }

    return changeTaskById(lists, listId, taskId, logic)
}


export const changeCommentById = (lists, listId, taskId, commentId, callBack) => {
    const logic = selectedTask => {
        const changedSubtasks = selectedTask.comments.map(comment => {
            if(comment._id === commentId) {
                return callBack({...comment})
            }
            return comment
        })
        selectedTask.comments = [...changedSubtasks]
        return selectedTask
    }

    return changeTaskById(lists, listId, taskId, logic)
}