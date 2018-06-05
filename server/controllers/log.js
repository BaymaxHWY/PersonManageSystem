const log = require('../model/log')

class Log {
    async getAll(ctx) {
        let res = await log.findAll()
        ctx.body = {
            res
        }
    }
}
module.exports = new Log()
