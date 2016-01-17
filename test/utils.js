'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
import test from 'ava'

// local
import utils from '../lib/utils'

//----------------------------------------------------------
// tests
//----------------------------------------------------------
// header

// shift
//----------------------------------------------------------
test('shift', t => t.same(
  utils.shift(['a', 'b', 'c'])
  , ['a', ['b', 'c']]
))

// readJson

// buildCmdFn
//----------------------------------------------------------
// test('build cmd fn', t => {
//   const fn = utils.buildCmdFn(['test'])
  
// })

// parseCmd
//----------------------------------------------------------
