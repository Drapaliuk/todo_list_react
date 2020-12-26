export const sorter = sortBy => (taskA, taskB) => {
    if(taskA[sortBy] > taskB[sortBy]) return -1
    if(taskA[sortBy] < taskB[sortBy]) return 1
    return 0
}