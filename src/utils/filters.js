import { ASC, DESC } from "../service/constants"
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
                        // console.log('desc sorting')
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
                        // console.log('asc sorting')
                        return (valueB[this.sortBy] - valueA[this.sortBy])
                    }
            }
        }
        return ordersHandlers[sortOrder]
    }.bind(this)
}





// const sortHandlers = {
//     desc: (valueA, valueB) => {
//         const valueType = typeof valueA[sortBy]
//         console.log(valueType)
//         if(valueType === 'string') {
//             if(valueA[sortBy] < valueB[sortBy]) return -1
//             if(valueA[sortBy] > valueB[sortBy]) return 1
//             return 0
//         }

//         if(valueType === 'number' || valueType === 'boolean') {
//             return (valueA[sortBy] - valueB[sortBy])
//         }

//     },

//     asc: (valueA, valueB) => {
//         const valueType = typeof valueA[sortBy]
//         if(valueType === 'string') {
//             if(valueA[sortBy] > valueB[sortBy]) return -1
//             if(valueA[sortBy] < valueB[sortBy]) return 1
//             return 0
//         }

//         if(valueType === 'number' || valueType === 'boolean') {
//             return (valueB[sortBy] - valueA[sortBy])
//         }
//     }
// }