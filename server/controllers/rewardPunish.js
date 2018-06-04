const rewardPunish = require('../model/rewardPunish')

class RewardPunish {
    async getAll(ctx) {
        let res = await rewardPunish.findAll()
        ctx.body = {
            res
        }
    }
    async insertOrUpdate(ctx) {
        let data = ctx.request.body
        let res = await rewardPunish.upsert(data)
        ctx.body = { res }
    }
    async delete(ctx) {
        let data = ctx.request.body
        let res = await rewardPunish.findOne({
            where: {
                id: data.id
            }
        })
        ctx.body = res.destroy()
    }
}

module.exports = new RewardPunish()