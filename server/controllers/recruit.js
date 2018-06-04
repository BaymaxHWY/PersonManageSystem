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
        // console.log(data)
        let res = await staff.upsert(data)
        ctx.body = { res }
    }
    async delete(ctx) {
        let data = ctx.request.body
        // console.log(data)
        let res = await recruit.findOne({
            where: {
                recruit_id: data.recruit_id
            }
        })
        ctx.body = res.destroy()
    }
}
module.exports = new Recruit()
