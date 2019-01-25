const {join, slice, toString} = require('ramda')

const and       = require('crocks/logic/and')
const ifElse    = require('crocks/logic/ifElse')
const not       = require('crocks/logic/not')
const or        = require('crocks/logic/or')

const chain     = require('crocks/pointfree/chain')
const concat    = require('crocks/pointfree/concat')
const filter    = require('crocks/pointfree/filter')
const head      = require('crocks/pointfree/head')
const map       = require('crocks/pointfree/map')
const option    = require('crocks/pointfree/option')

const compose   = require('crocks/helpers/compose')
const curry     = require('crocks/helpers/curry')

const identity  = require('crocks/combinators/identity')

const isArray   = require('crocks/predicates/isArray')
const isEmpty   = require('crocks/predicates/isEmpty')
const isNil     = require('crocks/predicates/isNil')
const isNumber  = require('crocks/predicates/isNumber')
const isString  = require('crocks/predicates/isString')

const safe      = require('crocks/Maybe/safe')
const {Just, Nothing} = require('crocks/Maybe')

// isNonEmptyArray :: Object -> Boolean
const isNonEmptyArray = and(not(isEmpty), isArray)

// concatFuns :: Function -> Function -> [a] -> [a]
const concatFuns = curry((f, g, x) => concat(f(x), g(x)))

// dropLast :: [a] => Maybe [a]
const dropLast =
  ifElse(
    isNonEmptyArray,
    compose(Just, slice(0, -1)),
    Nothing)

// last :: [a] -> Maybe a
const last =
  ifElse(
    isNonEmptyArray,
    compose(head, slice(-1, Infinity)),
    Nothing)

// notEmpty :: [a] -> Boolean
const notEmpty = and(
  or(isNumber, not(isEmpty)),
  not(isNil))

// nonStringToString :: Object -> String
const nonStringToString = ifElse(not(isString), toString, identity)

// prependConnectingWord :: String -> [String] -> Maybe [String]
const prependConnectingWord = curry((connectingWord, wordList) =>
  chain(
    compose(Just, x => [x]),
    concat(
      last(wordList),
      safe(isString, connectingWord))))

// oc :: Object -> String
const oc = connectingWord => compose(
  join(', '),
  option([]),
  chain(concatFuns(prependConnectingWord(connectingWord), dropLast)),
  map(map(nonStringToString)),
  map(filter(notEmpty)),
  safe(isArray)
)

module.exports = {
  oc,
  or: oc('or '),
  and: oc('and ')
}
