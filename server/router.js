const router = require('koa-router')()
const depart = require('./controllers/depart')
const login = require('./controllers/login')
const staff = require('./controllers/staff')
const recruit = require('./controllers/recruit')

router.post('/api/login', login.checkLogin)
//部门管理
router.get('/api/depart', depart.getAll)
router.post('/api/departUpsert', depart.insertOrUpdate)
router.post('/api/departDelete', depart.delete)
//人员管理
router.get('/api/staff', staff.getAll)
router.post('/api/staffUpsert', staff.insertOrUpdate)
router.post('/api/staffDelete', staff.delete)
//招聘管理
router.get('/api/recruit', recruit.getAll)
router.post('/api/recruitEnroll', recruit.enroll)
router.post('/api/recruitDelete', recruit.delete)

router.all('/api/*', async function (ctx) {
    ctx.throw(404, '未找到相关 API')
})

module.exports = router