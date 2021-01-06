import { ASC, DESC } from "../../service/constants/constants"
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