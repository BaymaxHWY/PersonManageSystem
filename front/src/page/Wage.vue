<template>
    <div class="depart"> 
        <Modal
        v-model="modal"
        title="编辑信息"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" style="width:300px"></Input>
        </FormItem>
        <FormItem label="工资/月" prop="money">
            <InputNumber :max="10000" :min="1" v-model="formValidate.money"></InputNumber>
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>工作管理</BreadcrumbItem>
                <BreadcrumbItem>薪资管理</BreadcrumbItem>
            </Breadcrumb>
            <!-- <Button type="ghost" icon="plus" class="addBtn" @click="addOne">添加</Button> -->
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
            columns: [
                {
                    title: '姓名',
                    key: 'name',
                },
                {
                    title: '金额/月',
                    key: 'money'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
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
                            }, '编辑')
                        ]);
                    }
                }
            ],
            formValidate: {
                    staff_id: '',
                    name: '',
                    money: 0,
                    index:''
            },
            data: [],
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
            ok () {
                if(this.formValidate.name === ''||this.formValidate.money=== 0 ){
                    this.$Message.error('填写不完整')
                    return
                }
                this.formValidate.username = Cookies.get('username')
                let res = api.post('/api/staffUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    if(data.res){
                        that.$Message.success('添加成功')
                        let t = Object.assign({}, that.formValidate)
                        that.data.push(t)
                        return
                    }else{
                        that.$Message.success('修改成功')
                        utility.assginObject(that.data[that.formValidate.index], that.formValidate)
                        return
                    }
                    that.$Message.error('操作失败')
                })
            },
            cancel(){
            }
        },
    created () {
        let res = api.get('/api/staff')
        let that = this
        res.then(function(response){
            let {data, status} = response
            that.data = data.res
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