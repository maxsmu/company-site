/**
 * @Author: Micheal
 * @Date: 2017-03-21 22:36:22
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-21 22:42:18
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
const db = require('./database')
const logger = require('./utils/logger')

const routes = require('./routes')

const app = express()

if (process.argv[2] === "dev") {
  app.use(morgan("dev"))
}

app.set('views', './views')
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: "qiongyoo",
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(cors())

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(2333, () => console.log(`系统在端口2333成功启动`))
