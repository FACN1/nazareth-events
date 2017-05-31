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
