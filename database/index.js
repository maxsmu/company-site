/**
 * @Author: Micheal
 * @Date: 2017-03-22 20:58:23
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-23 09:19:45
 * @GitHub: https://github.com/maxsmu
*/
const mongoose = require('mongoose')
const conf = require('../config')
const autoIncrement = require('mongoose-auto-increment')
const env = process.env.NODE_ENV || 'development'

const username = env === 'development' ? '' : conf.database[env].username + ':'
const password = env === 'development' ? '' : conf.database[env].password + '@'
const serverurl = conf.database[env].hostname.join(',')
const dbname = conf.database[env].dbname

const mongourl = `mongodb://${username + password + serverurl}/${dbname}`

const options = {
  server: {
    poolSize: 30
  },
  replset: {
    rs_name: conf.database[env].re_name,
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
