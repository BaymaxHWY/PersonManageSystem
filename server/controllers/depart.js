const depart = require('../model/depart')

class Depart {
    async getAll(ctx) {
        let res = await depart.findAll()
        ctx.body = {
            res
        }
    }
    async insertOrUpdate(ctx){
        let data = ctx.request.body
        // console.log(data)
        let res = await depart.upsert(data)
        ctx.body = {res}
    }
    async delete(ctx){
        let data = ctx.request.body
        // console.log(data)
        let res = await depart.findOne({
            where:{
                depart_id: data.depart_id
            }
        })
        ctx.body = res.destroy()
    }
}
module.exports = new Depart()
