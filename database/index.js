/**
 * @Author: Micheal
 * @Date: 2017-03-22 20:58:23
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-27 10:46:44
 * @GitHub: https://github.com/maxsmu
*/
const mongoose = require('mongoose')
const conf = require('../config/database')
const autoIncrement = require('mongoose-auto-increment')
const env = process.env.NODE_ENV || 'development'

const username = env === 'development' ? '' : conf[env].username + ':'
const password = env === 'development' ? '' : conf[env].password + '@'
const serverurl = conf[env].hostname.join(',')
const dbname = conf[env].dbname

const mongourl = `mongodb://${username + password + serverurl}/${dbname}`

const options = {
  server: {
    poolSize: 30
  },
  replset: {
    rs_name: conf[env].re_name,
    poolSize: 20,
    connectWithNoPrimary: true
  }
}

mongoose.Promise = global.Promise
mongoose.connect(mongourl, options)
const db = mongoose.connection
autoIncrement.initialize(db)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback() {
  console.log('数据库建立。。。连接成功')
})

module.exports = db
