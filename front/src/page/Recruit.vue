<template>
    <div class="depart"> 
        <Modal
        v-model="modal1"
        title="编辑招聘信息"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="意向部门" prop="depart">
            <Input v-model="formValidate.intent_depart"></Input>
        </FormItem>
        <FormItem label="意向职位" prop="position">
            <Select v-model="formValidate.intent_position" size="large" style="width:100px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="电话号码" prop="tel">
            <!-- <Input v-model="formValidate.tel"></Input> -->
            <!-- <InputNumber :max="99999999999" :min="1" v-model="formValidate.tel"></InputNumber> -->
            <input type="number" v-model="formValidate.tel">
        </FormItem>
        <FormItem label="QQ" prop="qq">
            <!-- <Input v-model="formValidate.qq"></Input> -->
            <input type="number" v-model="formValidate.qq">
            <!-- <InputNumber :max="999999999999" :min="1" v-model="formValidate.q"></InputNumber> -->
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>人事管理</BreadcrumbItem>
                <BreadcrumbItem>招聘管理</BreadcrumbItem>
                <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="modal1=true">添加招聘信息</Button>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', margin:'10px',width:'90%'}">
                <template>
                    <Table border :columns="columns7" :data="data6"></Table>
                </template>
            </Content>
        </Layout>
    </div>
</template>

<script>
import api from '../api/index'
export default {
    data () {
        return {
            typeList: [
                {
                    value: '总经理',
                    label: '总经理'
                },
                {
                    value: '副经理',
                    label: '副经理'
                },
                {
                    value: '主管',
                    label: '主管'
                },
                {
                    value: '组长',
                    label: '组长'
                },
                {
                    value: '普通员工',
                    label: '普通员工'
                },
            ],
            columns7: [
                {
                    title: '姓名',
                    key: 'name',
                },
                {
                    title: '意向部门',
                    key: 'intent_depart'
                },
                {
                    title: '意向职位',
                    key: 'intent_position'
                },
                {
                    title: '电话',
                    key: 'tel'
                },
                {
                    title: 'QQ',
                    key: 'qq'
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
                            }, '录用'),
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
            data6: [],
            modal1: false,
            wages: [
                {
                    position: '总经理',
                    wage: 10000
                },
                {
                    position: '副经理',
                    wage: 8000
                },
                {
                    position: '主管',
                    wage: 5000
                },
                {
                    position: '组长',
                    wage: 3000
                },
                {
                    position: '普通员工',
                    wage: 2000
                },
            ],
            formValidate: {
                    recruit_id: '',
                    name: '',
                    intent_depart:'',
                    intent_position: '',
                    tel:0,
                    qq:0
                },
        }
    },
    methods: {
            show (index) {
                let _data = {
                    id: '',
                    name: '',
                    position: '',
                    depart: '',
                    money:0,
                }
                _data.id = this.data6[index].recruit_id
                _data.name = this.data6[index].name
                _data.position = this.data6[index].intent_position
                _data.depart = this.data6[index].intent_depart
                this.wages.forEach(item => {
                    if(item.position === _data.position){
                        _data.money = item.wage
                    }
                })
                let res = api.post('/api/recruitEnroll', _data)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    if(data.res){
                        that.$Message.success('录用成功')
                        that.data6.splice(index, 1)
                    }
                })
            },
            remove (index) {
                let res = api.post('/api/recruitDelete', this.data6[index])
                let that = this
                res.then(function(response){
                    that.data6.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            ok () {
                if(this.formValidate.name === ''||this.formValidate.tel=== ''||
                this.formValidate.intent_position=== ''||this.formValidate.qq=== ''||this.formValidate.intent_depart=== ''){
                    this.$Message.error('填写不完整')
                    return
                }
                let res = api.post('/api/recruitUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    if(data.res){
                        that.$Message.success('添加成功')
                        that.data6.push(that.formValidate)
                        that.formValidate = {
                            recruit_id: '',
                            name: '',
                            intent_depart:'',
                            intent_position: '',
                            tel:0,
                            qq:0
                        }
                    }else{
                        that.formValidate = {
                            recruit_id: '',
                            name: '',
                            intent_depart:'',
                            intent_position: '',
                            tel:0,
                            qq:0
                        }
                        that.$Message.success('修改成功')
                    }
                })
            },
            cancel(){
                this.formValidate = {
                    recruit_id: '',
                    name: '',
                    intent_depart:'',
                    intent_position: '',
                    tel:0,
                    // qq:0
                }
            }
        },
    created () {
        let res = api.get('/api/recruit')
        let that = this
        res.then(function(response){
            let {data, status} = response
            that.data6 = data.res
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