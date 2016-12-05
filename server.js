'use strict'

/* LIBS */
const koa = require('koa')
const cors = require('kcors')
const request = require('co-request')

/* EXEC */
const app = module.exports = koa()

app.use(cors())

app.use(function *(next) {
  var start = new Date

  yield next

  var ms = new Date - start
  this.set('X-Response-Time', ms + 'ms')
})

app.use(function *() {
  const url = this.request.path.slice(1)
  const response = yield request(url)

  this.body = response.body
  this.status = response.statusCode
})

if (!module.parent) {
  const PORT = process.env.PORT || 3000

  console.log(`Server is running in port: ${PORT}`)
  app.listen(PORT)
}