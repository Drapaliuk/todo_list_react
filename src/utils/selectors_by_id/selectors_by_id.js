export class StateSelectors {

    static getFolder(state, folderID) {
        return state.userTasksFolders.find(({_id}) => _id === folderID)
    }

    static getList(state, folderID, listID) {
        if(!folderID) {
            return state.userTasksLists.find(({_id}) => _id === listID)
        }

        return this.getFolder(state, folderID).tasksLists.find(({_id}) => _id === listID)
    }

    static getTask(state, folderID, listID, taskID) {
        return this.getList(state, folderID, listID).tasks.find(({_id}) => _id === taskID)
    }
    static getSubTask(state, folderID, listID, taskID, subtaskID) {
        return this.getTask(state, folderID, listID, taskID).subtasks.find(({_id}) => _id === subtaskID)
    }
    static getComment(state, folderID, listID, taskID, commentID) {
        return this.getTask(state, folderID, listID, taskID).comments.find(({_id}) => _id === commentID)
    }
}



export const changeListById = (lists, listId, belongToFolder, callBack) => {
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