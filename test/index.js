'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
import {EventEmitter} from 'events'
import proc from 'child_process'

// npm
import sinon from 'sinon'
import test from 'ava'
import clor from 'clor'

// local
import Hari from '../'

//----------------------------------------------------------
// tests
//----------------------------------------------------------
test('constructor', t => {
  const hari = new Hari()
  t.is(hari.running, false)
  t.is(hari.runs, 0)
  t.is(hari.start, void 0)
  t.is(hari.now, void 0)
  t.is(hari.command, void 0)
  t.is(hari.args, void 0)
})

test('clear', t => {
  const hari = new Hari()
  const stub = sinon.stub(proc, 'spawn')
  hari.clear()
  t.true(stub.called)
  t.true(stub.calledWith('clear'))
  stub.restore()
})

test('convertHours', t => {
  const hari = new Hari()
  t.is(hari.convertHours(12), 0)
  t.is(hari.convertHours(13), 1)
  t.is(hari.convertHours(7), 7)
})

test('debounce', t => {
  const hari = new Hari()
  const clock = sinon.useFakeTimers()
  const clear = sinon.stub(hari, 'clear').returns(new EventEmitter())
  const run = sinon.stub(hari, 'run')
  hari.command = true
  hari.debounce()

  // tests
  t.true(hari.running, 'running')
  t.is(hari.runs, 1, 'runs')
  t.true(clear.called)
  t.false(run.called)
  clear().emit('close')
  t.true(run.called)
  clock.tick(50)
  t.false(hari.running, 'stopped running')

  // cleanup
  clock.restore()
})

test('duration', t => {
  const hari = new Hari()
  const clock = sinon.useFakeTimers()
  const stub = sinon.stub(hari, 'parseMs')
  hari.start = Date.parse(new Date())
  hari.now = new Date()
  hari.now.setSeconds(3)
  hari.duration()

  // tests
  t.true(stub.called, 'call parseMs')
  t.true(stub.calledWith(3000), 'call parseMs with correct value')

  // cleanup
  clock.restore()
})

test.skip('header', t => {
  const hari = new Hari()
  const clock = sinon.useFakeTimers()
  hari.start = Date.parse(new Date())
  hari.now = new Date()
  sinon.stub(console, 'log')
  const spy = sinon.spy(clor, 'log')
  hari.header()
  t.true(spy.called)
  // t.true(logger.called)
})

test.skip('init', t => {
})

test('longestStr', t => {
  const hari = new Hari()
  t.is(hari.longestStr(['one', 'two', 'three', 'four']), 5)
})

test('padStrs', t => {
  const hari = new Hari()
  t.same(
    hari.padStrs(['a', 'b ', 'c  '], 3)
    , ['a  ', 'b  ', 'c  ']
  )
})

test('parseCommand', t => {
  const hari = new Hari()
  hari.parseCommand('npm test -v')
  t.is(hari.command, 'npm', 'command')
  t.same(hari.args, ['test', '-v'], 'args')
})

test.skip('parseMs', t => {
})

test('prepTime', t => {
  const hari = new Hari()
  t.is(hari.prepTime(12), '12', 'stringified')
  t.is(hari.prepTime(3), '03', 'prepended')
})

test.skip('readPkg', t => {
})

test.skip('run', t => {
})

test.skip('time', t => {
})

test.skip('watch', t => {
})
