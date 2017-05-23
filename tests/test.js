var test = require('tape')

test('#1 a test that always passes', function (t) {
  t.plan(1)

  t.equal(1, 1, 'just testing, this must always be right')
})
