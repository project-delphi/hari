'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const chokidar = require('chokidar')
const restoreCursor = require('restore-cursor')

// local
const util = require('./lib/utils')
const time = require('./lib/time')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
module.exports = class Hari {
  constructor() {
    this.running = false
    this.runs = 0
    this.cmd = void 0
    this.subP = void 0
    this.startTime = void 0
    this.timestamp = void 0
    this.debounce = void 0
    return this
  }

  ansi(codes) {
    const write = code => process.stdout.write(`\u001b[${code}`)
    return typeof codes === 'object' ? codes.map(write) : write(codes)
  }

  bindTimes(date) {
    this.startTime = time.fromOb(date)
    this.timestamp = Date.parse(date)
  }

  init() {
    restoreCursor()
    return util.readJson('./package.json')
      .then(ob => {
        this.bindTimes(new Date())
        this.cmd = util.parseCmd(ob.hari.run)
        return chokidar.watch(ob.hari.watch).on('all', () => {
          clearTimeout(this.debounce)
          this.debounce = setTimeout(() => this.print(), 50)
        })
      })
      .catch(e => console.log(e.stack))
  }

  print() {
    this.runs += 1
    if (this.subP && this.subP.exitCode === null) this.subP.kill()
    this.ansi(['2J', 'H'])
    console.log(util.header(this.startTime, this.timestamp, this.runs))
    this.subP = this.cmd().on('close', () => this.ansi('?25l'))
  }
}
