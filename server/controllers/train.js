const train = require('../model/train')

class Train {
    async getAll(ctx) {
        let res = await train.findAll()
        ctx.body = {
            res
        }
    }
    async insertOrUpdate(ctx) {
        let data = ctx.request.body
        let res = await train.upsert(data)
        ctx.body = { res }
    }
    async delete(ctx) {
        let data = ctx.request.body
        let res = await train.findOne({
            where: {
                id: data.id
            }
        })
        ctx.body = res.destroy()
    }
}

module.exports = new Train()