const recruit = require('../model/recruit')
const staff = require('../model/staff')

class Recruit {
    async getAll(ctx) {
        let res = await recruit.findAll()
        ctx.body = {
            res
        }
    }
    async enroll(ctx) {
        let data = ctx.request.body
        let res = await staff.upsert(data)
        let res1 = await recruit.findOne({
            where: {
                name: data.name
            }
        })
        res1.destroy()
        ctx.body = { res }
    }
    async insertOrUpdate(ctx) {
        let data = ctx.request.body
        let res = await recruit.upsert(data)
        ctx.body = { res }
    }
    async delete(ctx) {
        let data = ctx.request.body
        let res = await recruit.findOne({
            where: {
                recruit_id: data.recruit_id
            }
        })
        ctx.body = res.destroy()
    }
}
module.exports = new Recruit()
