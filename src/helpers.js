const helpers = module.exports = {}

// converts events from array of event objs into array of objects of form { date, events array }
// assumes events come in date order
helpers.formatEvents = events => {
  var output = []
  events.forEach(event => {
    if (output.length === 0 || output[output.length - 1].date !== event.date) {
      output.push({date: event.date, events: [event]})
    } else {
      output[output.length - 1].events.push(event)
    }
  })
  return output
}
