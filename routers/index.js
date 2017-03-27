/**
 * @Author: Micheal
 * @Date: 2017-03-21 22:38:50
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-27 10:50:24
 * @GitHub: https://github.com/maxsmu
*/
const router = require('express').Router()
const ctrls = require('../controller')
// const ensureLogin = require('../interceptor/session.interceptor')
const logger = require('../interceptor/logger.interceptor')

router.use(logger)
// hello world
router.get('/', ctrls.base.fn)

module.exports = router;
