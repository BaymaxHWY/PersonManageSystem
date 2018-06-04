<template>
    <div class="depart"> 
        <Modal
        v-model="modal1"
        title="编辑信息"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="员工部门" prop="depart">
            <Input v-model="formValidate.depart"></Input>
        </FormItem>
        <FormItem label="员工职位" prop="position">
            <Select v-model="formValidate.position" size="large" style="width:100px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>人事管理</BreadcrumbItem>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="modal1=true">添加员工</Button>
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
                    // {
                    //     title: '员工编号',
                    //     key: 'staff_id'
                    // },
                {
                    title: '所属部门',
                    key: 'depart'
                },
                {
                    title: '员工职位',
                    key: 'position'
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
            data6: [],
            modal1: false,
            formValidate: {
                    staff_id: '',
                    name: '',
                    depart:'',
                    position: '',
                    money:0,
                },
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
            ]
        }
    },
    methods: {
            show (index) {
                this.modal1 = true
                this.formValidate = this.data6[index]
            },
            remove (index) {
                let res = api.post('/api/staffDelete', this.data6[index])
                let that = this
                res.then(function(response){
                    that.data6.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            ok () {
                // this.$Message.info('Clicked ok');
                if(this.formValidate.name === ''||this.formValidate.position=== ''||this.formValidate.depart=== '' ){
                    this.$Message.error('填写不完整')
                    return
                }
                this.wages.forEach(item => {
                    if(item.position === this.formValidate.position){
                        this.formValidate.money = item.wage
                    }
                })
                let res = api.post('/api/staffUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    // console.log(data)
                    if(data.res){
                        that.$Message.success('添加成功')
                        that.data6.push(that.formValidate)
                        that.formValidate = {
                            staff_id: '',
                            name: '',
                            depart:'',
                            position: '',
                            money:0,
                        }
                        return
                    }else{
                        that.formValidate = {
                            staff_id: '',
                            name: '',
                            depart:'',
                            position: '',
                            money:0,
                        }
                        that.$Message.success('修改成功')
                        return
                    }
                    that.$Message.error('操作失败')
                })
            },
            cancel(){
                this.formValidate = {
                            staff_id: '',
                            name: '',
                            depart:'',
                            position: '',
                            money:0,
                        }
            }
        },
    created () {
        let res = api.get('/api/staff')
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