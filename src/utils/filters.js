import { ASC, DESC } from "../service/constants"



export const SortHandler = function(sortBy) {
    this.sortBy = sortBy
    this[DESC] = function (valueA, valueB) {
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
        

    }

    this[ASC] = function (valueA, valueB) {

        const innerFunc = () => {
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
        return innerFunc()
        
    }
}

// export const sortHandlers = {
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
//         console.log(valueA)
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