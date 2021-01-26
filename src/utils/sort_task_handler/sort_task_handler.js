import { ASC, DESC, SEARCH_BY_LETTERS } from "../../service/constants/constants"







export const sortHandler = (sortBy, order, searchByLettersPattern) => (tasks) => {
    const tasksCopy = [...tasks];
    const sortHandlers = {
        [DESC]: (valueA, valueB) => {
            const valueType = typeof valueA[sortBy]
            if(valueType === 'string') {
                if(valueA[sortBy] < valueB[sortBy]) return -1
                if(valueA[sortBy] > valueB[sortBy]) return 1
                return 0
            }
    
            if(valueType === 'number' || valueType === 'boolean') {
                return (valueA[sortBy] - valueB[sortBy])
            }
        },
    
        [ASC]: (valueA, valueB) => {
                const valueType = typeof valueA[sortBy]
    
                if(valueType === 'string') {
                    if(valueA[sortBy] > valueB[sortBy]) return -1
                    if(valueA[sortBy] < valueB[sortBy]) return 1
                    return 0
                }
        
                if(valueType === 'number' || valueType === 'boolean') {
                    return (valueB[sortBy] - valueA[sortBy])
                }
        }
    }

    function regExpFilter(str = '') {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };
    

    if(sortBy === 'isImportant' ||
       sortBy === 'text' ||
       sortBy === 'dateCreation' ||
       sortBy === 'hasDone') {
        return tasksCopy.sort(sortHandlers[order])
    }

    if(sortBy === 'searchByLetters') {

        const regExpPattern = new RegExp(regExpFilter(searchByLettersPattern))

        return tasksCopy.filter(task => {
            // const matches = task.text.match(regExpPattern)
            // if(matches) {
            //     const startIndex  = matches.index
            //     const endIndex = matches?.input?.length
            //     console.group()
            //     console.log('matches', matches)
            //     console.log('startIndex', startIndex)
            //     console.log('endIndex', endIndex)
            //     console.groupEnd()
            // }
            return regExpPattern.test(task.text)
        })
    }
    return tasks
}



export const SortHandler = function(sortBy) {
    this.sortBy = sortBy
    this.getSortHandler = function(sortOrder) {
        const ordersHandlers = {
            [DESC]: (valueA, valueB) => {
                const innerFunc = () => {
                    const valueType = typeof valueA[this.sortBy]
        
                    if(valueType === 'string') {
                        if(valueA[this.sortBy] < valueB[this.sortBy]) return -1
                        if(valueA[this.sortBy] > valueB[this.sortBy]) return 1
                        return 0
                    }
            
                    if(valueType === 'number' || valueType === 'boolean') {
                        return (valueA[this.sortBy] - valueB[this.sortBy])
                    }
                }
        
                return innerFunc()
        
            },
    
            [ASC]: (valueA, valueB) => {
                    const valueType = typeof valueA[this.sortBy]
        
                    if(valueType === 'string') {
                        if(valueA[this.sortBy] > valueB[this.sortBy]) return -1
                        if(valueA[this.sortBy] < valueB[this.sortBy]) return 1
                        return 0
                    }
            
                    if(valueType === 'number' || valueType === 'boolean') {
                        return (valueB[this.sortBy] - valueA[this.sortBy])
                    }
            }
        }
        return ordersHandlers[sortOrder]
    }.bind(this)
}