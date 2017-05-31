const helpers = module.exports = {}

// converts events from array of event objs into array of objects of form { date, events array }
helpers.formatEvents = events => {
  // eventsObj is of the form {date: event, date: event, etc.}
  const eventsObj = events.reduce((eventsObj, event) =>
    Object.assign(eventsObj, {
      [event.date]:
        eventsObj[event.date]
          ? eventsObj[event.date].concat(event)
          : [event]
    }
  ), {})

  return Object.keys(eventsObj).sort().map(date => ({
    date: date,
    events: eventsObj[date]
  }))
}

// can take as input a date or a date string in certain formats (e.g. yyyy-mm-dd)
helpers.addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// takes as input a date object, formats date as yyyy-mm-dd
helpers.formatDateForSQL = (date) => {
  const month = date.getMonth() + 1 // getMonth() is zero-based
  const day = date.getDate()
  return [
    date.getFullYear(),
    (month > 9 ? '' : '0') + month,
    (day > 9 ? '' : '0') + day
  ].join('-')
}
