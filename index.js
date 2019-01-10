const {and, oc, or} = require('./oxford-comma')
const ors = ['work', 'play', 'sleep']
const ands = ['chips', 'cheese', '<refreshing beverage>']
const tricky = ['gravel', '', null, 'stones', [], 'rocks', '']
const mixed = ['1', 2, 3]
const objs = [{'one': 1}, {'two': 2}, {'three': 3}]

const lastly = oc('and lastly ')

console.log(or(ors))      // work, play, or sleep
console.log(and(ands))    // chips, cheese, and <refreshing beverage>
console.log(lastly(ors))  // work, play, and lastly sleep
console.log(and(tricky))  // gravel, stones, and rocks
console.log(or(mixed))    // 1, 2, or 3
console.log(and(objs))    // {"one": 1}, {"two": 2}, and {"three": 3}
