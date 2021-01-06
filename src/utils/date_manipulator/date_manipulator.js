export class SortByDatesCreation {
    constructor(firstWeekDay) {
        this.firstWeekDay = firstWeekDay
    }

    compareTwoDates (date1, date2, excludeProperties = [], compareByProperties) {
        const parsedDate1 = this.dateParser(date1)
        const parsedDate2 = this.dateParser(date2)
        let isTheSame;

        if(compareByProperties && compareByProperties.length > 0) {
            for(let key in parsedDate1) {
                if(!compareByProperties.includes(key)) continue
                if(parsedDate1[key] !== parsedDate2[key]) {
                    isTheSame = false
                    break
                }
                isTheSame = true
            }

            return isTheSame
        }

    
        for(let key in parsedDate1) {
            if(excludeProperties.includes(key)) continue
            if(parsedDate1[key] !== parsedDate2[key]) {
                isTheSame = false
                break
            }

            isTheSame = true
        }

        return isTheSame
    }

    dateParser (date) {
        const dateToString = new Date(date)
        return {
            date: dateToString.getDate(),
            month: dateToString.getMonth(),
            year: dateToString.getFullYear(),
            day: dateToString.getDay(),
        }
    }

    getDatesOfWeekEdge (date) {
        const weekDayOrder = date.getDay()

        let firstWeekDayDate = date.getDate() - weekDayOrder
        if(this.firstWeekDay === 'monday') {
            firstWeekDayDate += 1
        }
        
        const dateOfTheFirstDayWeek = new Date(date.setDate(firstWeekDayDate))
        const dateOfTheLastDayWeek = new Date(new Date(dateOfTheFirstDayWeek).setDate(dateOfTheFirstDayWeek.getDate() + 6))

        return {dateOfTheFirstDayWeek, dateOfTheLastDayWeek}
    }

    isThisWeek (creationDate, today) {
        const creationDateCopy = new Date(creationDate)
        const todayCopy = new Date(today)
       
        
        const currentWeekEdges = this.getDatesOfWeekEdge(todayCopy)
        const creationWeekEdges = this.getDatesOfWeekEdge(creationDateCopy)
        
        const isMatchInRange = this.compareTwoDates(creationWeekEdges.dateOfTheFirstDayWeek, currentWeekEdges.dateOfTheFirstDayWeek) && 
                               this.compareTwoDates(creationWeekEdges.dateOfTheLastDayWeek, currentWeekEdges.dateOfTheLastDayWeek)
    
        return isMatchInRange
    }

    isThisMonth (creationDate, currentDate) {
        return this.compareTwoDates(creationDate, currentDate, ['date', 'day'])
    }

    isThisYear (creationDate, currentDate) {
        return this.compareTwoDates(creationDate, currentDate, [], ['year'])
    }

}