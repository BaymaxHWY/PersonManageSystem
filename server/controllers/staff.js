const staff = require('../model/staff')

class Staff{
    async getAll(ctx){
        let res = await staff.findAll()
        ctx.body = {
            res
        }
    }
    async insertOrUpdate(ctx) {
        let data = ctx.request.body
        // console.log(data)
        let res = await staff.upsert(data)
        ctx.body = { res }
    }
    async delete(ctx) {
        let data = ctx.request.body
        // console.log(data)
        let res = await staff.findOne({
            where: {
                staff_id: data.staff_id
            }
        })
        ctx.body = res.destroy()
    }
}

module.exports = new Staff()