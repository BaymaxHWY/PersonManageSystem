<template>
    <div class="home">
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>首页</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', margin:'10px'}">
                <Row :gutter="16">
                    <Col span="6">
                        <Card>
                            <p slot="title">公司主要部门</p>
                            <p v-for="(item,index) in departs" :key="index">{{item.depart_name}}</p>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card>
                            <p slot="title">公司主要员工</p>
                            <p v-for="(item,index) in staffs" :key="index">{{item.name}}</p>
                        </Card>
                    </Col>
                     <Col span="6">
                        <Card>
                            <p slot="title">近期奖惩记录</p>
                            <p v-for="(item,index) in rewardPunishs" :key="index">{{item.name}} {{item.type}} {{item.money}}元</p>
                        </Card>
                    </Col>
                     <Col span="6">
                        <Card>
                            <p slot="title">近期培训项目</p>
                            <p v-for="(item,index) in trains" :key="index">{{item.train_name}}</p>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </div>
</template>

<script>
import api from '../api/index'
export default {
    data () {
            return {
                departs:[],
                staffs:[],
                rewardPunishs:[],
                trains:[]
            }
        },
    methods: {
        
    },
    created () {
        let that = this

        let departRes = api.get('/api/depart')
        let staffRes = api.get('/api/staff')
        let rewardPunishRes = api.get('/api/rewardPunish')
        let trainRes = api.get('/api/train')
        
        departRes.then(function (response) {
            let {data} = response
            that.departs = data.res
        })
        staffRes.then(function (response) {
            let {data} = response
            that.staffs = data.res
        })
        rewardPunishRes.then(function (response) {
            let {data} = response
            that.rewardPunishs = data.res
        })
        trainRes.then(function (response) {
            let {data} = response
            that.trains = data.res
        })
    }
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
}
p{
    text-align: center
}
</style>
