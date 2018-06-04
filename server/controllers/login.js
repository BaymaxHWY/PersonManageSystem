const system_user = require('../model/system')

class Login{
    async checkLogin(ctx){
        let req = ctx.request.body
        let msg = false
        let res = await system_user.findOne({
            where:{
                username: req.username
            }
        })
        if(res){
            msg = res.password === req.password? true:false
        }
        ctx.body = {msg: msg}
    }
}

module.exports = new Login()