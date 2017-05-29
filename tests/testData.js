module.exports = {

  formatEvents: [
    {
      input: [
        {title: 'test me baby', date: '2011-03-03'}
      ],
      expectedOutput: [
        {
          date: '2011-03-03',
          events: [
            {title: 'test me baby', date: '2011-03-03'}
          ]
        }
      ],
      message: 'should return correct result for list of one event'
    },
    {
      input: [
        {title: 'test me baby', date: '2011-03-03'},
        {title: 'test me too baby', date: '2011-03-03'},
        {title: 'test me again baby', date: '2011-03-03'}
      ],
      expectedOutput: [
        {
          date: '2011-03-03',
          events: [
            {title: 'test me baby', date: '2011-03-03'},
            {title: 'test me too baby', date: '2011-03-03'},
            {title: 'test me again baby', date: '2011-03-03'}
          ]
        }
      ],
      message: 'should return correct result for 3 events on one date'
    }
  ]

}
