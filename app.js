/**
 * @Author: Micheal
 * @Date: 2017-03-21 22:36:22
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-27 14:35:22
 * @GitHub: https://github.com/maxsmu
*/
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const mongoose = require('mongoose')
const compression = require('compression')

const db = require('./database')
const logger = require('./utils/logger')
const routes = require('./routers')
const credentials = require('./config/credentials')
const app = express()

if (process.argv[2] === 'dev') {
  app.use(morgan('dev'))
}

// 使用Gzip压缩
app.use(compression());
// 设置模版目录
// app.set('views', './views')
// 设置模版引擎为ejs
// app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'src')))
// session 中间件
app.use(session({
  // 强制更新 session
  resave: false,
  // 设置为 false，强制创建一个 session，即使用户未登录
  saveUninitialized: true,
  // 过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  secret: credentials.sessionSecret,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(cors())

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(2333, () => console.log(`系统在端口2333成功启动`))
