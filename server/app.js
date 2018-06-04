const koa = require('koa')
const moment = require('moment')
const bodyParser = require('koa-bodyparser')
const config = require('config')
const router = require('./router')

const app = new koa()

moment.locale('zh-cn')

app.use(bodyParser())

app.use(router.routes())

app.listen(config.port)
console.log('Server listen on ' + config.port)

