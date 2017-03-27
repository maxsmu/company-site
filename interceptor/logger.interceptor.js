/**
 * @Author: Micheal
 * @Date: 2017-03-27 11:03:44
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-27 11:03:44
 * @GitHub: https://github.com/maxsmu
*/
const Logger = require('../utils/logger')

const logger = (req, res, next) => {
  const oldSend = res.send
  res.send = body => {
    res.body = body
    oldSend.call(res, body)
  }
  res.on("finish", () => {
    if (res.statusCode >= 400) Logger.warn({
      type: "SERVER_WARN",
      header: req.headers,
      path: req.path,
      statusCode: res.statusCode,
      query: req.query,
      params: req.params,
      body: req.body,
      content: res.body
    })
  })
  next()
}

module.exports = logger
