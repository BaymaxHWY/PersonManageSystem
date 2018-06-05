const log = require('../model/log')

module.exports = async (ctx, next) => {
    if (ctx.request.method === 'GET'){
        await next()
    }else{
        let req = ctx.request.body
        let descs = {
            '/api/departUpsert': '修改或添加新部门',
            '/api/departDelete': '删除部门',
            '/api/staffUpsert': '修改或添加公司职员',
            '/api/staffDelete': '删除公司职员',
            '/api/recruitUpsert': '添加招聘信息',
            '/api/recruitDelete': '删除招聘信息',
            '/api/trainUpsert': '修改或添加培训项目',
            '/api/trainDelete': '删除培训项目',
            '/api/rewardPunishUpsert': '修改或添加奖惩记录',
            '/api/rewardPunishDelete': '删除奖惩记录'
        }
        let data = {
            user: req.username,
            ip: ctx.request.header.host,
            user_desc: descs[ctx.request.url]
        }
        log.upsert(data)
        await next()
    }
}
