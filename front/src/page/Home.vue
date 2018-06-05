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
            <template>
                    <Table height="420" border :columns="columns" :data="data"></Table>
                    <!-- <Page :total="100" show-total></Page> -->
            </template>
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
                trains:[],
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '执行人',
                        key: 'user'
                    },
                    {
                        title: '来源',
                        key: 'ip'
                    },
                    {
                        title: '描述',
                        key: 'user_desc'
                    },
                    {
                        title: '状态',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return  h('div', {
                                    style: {
                                        marginRight: '5px',
                                        backgroundColor: 'rgb(208, 232, 220)',
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        color: '#19be6b',
                                        borderRadius: '5px',
                                        border: 'none'
                                    }
                                }, '完成');
                        }
                    }
                ],
                data: [], 
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
        let log = api.get('/api/log')

        log.then(function (response) {
            let {data} = response
            that.data = data.res
        })
        
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
