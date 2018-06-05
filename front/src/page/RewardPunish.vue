<template>
    <div class="depart"> 
        <Modal
        v-model="modal"
        title="编辑信息"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="选择员工" prop="name">
            <Select v-model="formValidate.name" size="large" style="width:100px">
                <Option v-for="item in staffList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="奖惩类型" prop="type">
            <Select v-model="formValidate.type" size="large" style="width:100px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="金额/元" prop="money">
            <InputNumber :max="100000" :min="1" v-model="formValidate.money"></InputNumber>
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>工作管理</BreadcrumbItem>
                <BreadcrumbItem>奖惩管理</BreadcrumbItem>
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="addOne">添加</Button>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', margin:'10px',width:'90%'}">
                <template>
                    <Table height="420" border :columns="columns" :data="data"></Table>
                </template>
            </Content>
        </Layout>
    </div>
</template>

<script>
import api from '../api/index'
import utility from "../utility/index"
import Cookies from 'js-cookie'
export default {
    data () {
        return {
            typeList: [
                {
                    value: '惩罚',
                    label: '惩罚'
                },
                {
                    value: '奖励',
                    label: '奖励'
                },
            ],
            columns: [
                {
                    title: '姓名',
                    key: 'name',
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '金额/元',
                    key: 'money'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [],
            staffList:[],
            formValidate: {
                    id: '',
                    name: '',
                    type:'',
                    money: 0,
                    index:''
            },
            modal: false,  
        }
    },
    methods: {
            addOne (){
                utility.initObject(this.formValidate)
                this.modal = true
            },
            show (index) {
                this.modal = true
                this.formValidate = Object.assign({}, this.data[index])
                this.formValidate.index = index
            },
            remove (index) {
                this.data[index].username = Cookies.get('username')
                let res = api.post('/api/rewardPunishDelete', this.data[index])
                let that = this
                res.then(function(response){
                    that.data.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            ok () {
                if(this.formValidate.name === ''||this.formValidate.type=== ''||this.formValidate.money=== 0 ){
                    this.$Message.error('填写不完整')
                    return
                }
                this.formValidate.username = Cookies.get('username')
                let res = api.post('/api/rewardPunishUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    if(data.res){
                        that.$Message.success('添加成功')
                        let t = Object.assign({}, that.formValidate)
                        that.data.push(t)
                        return
                    }else{
                        utility.assginObject(that.data[that.formValidate.index], that.formValidate)
                        that.$Message.success('修改成功')
                        return
                    }
                    that.$Message.error('操作失败')
                })
            },
            cancel(){}
        },
    created () {
        let res = api.get('/api/rewardPunish')
        let that = this
        res.then(function(response){
            let {data, status} = response
            that.data = data.res
        })
        let staffRes = api.get('/api/staff')
        staffRes.then(function(response){
            let {data, status} = response
            data.res.forEach(item => {
                that.staffList.push({
                    value: item.name,
                    label: item.name
                })
            });
        })
    }
}
</script>

<style lang="less" scoped>
.depart{
    width: 100%;
}
.addBtn{
    width: 7%;
    position: absolute;
    right: 11%;
    top:10%;
}
</style>