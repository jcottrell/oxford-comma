const {and, compose, concat, dropLast, filter, is, isEmpty, isNil, join, last,
  map, not, toString} = require('ramda')
const notEmpty = x => and(compose(not, isEmpty)(x), compose(not, isNil)(x))
const nonStringToString = x => compose(not, is(String))(x) ? toString(x) : x

const oc = finalWord => compose(
  join(', '),
  x => concat(dropLast(1, x), [finalWord+last(x)]),
  map(nonStringToString),
  filter(notEmpty)
)

module.exports = {
  oc,
  or: oc('or '),
  and: oc('and ')
}
