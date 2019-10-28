//mantiene el codio

const util = require('util')

const helloPluto = util.deprecate(() => {
    console.log("hello deprecated pluto")
}, 'pluto is deprecated, It´s not a planet anymore')

helloPluto()

// para hacer debugging --inspect:
//node --inspect console-class.js

