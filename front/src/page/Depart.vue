<template>
    <div class="depart"> 
        <Modal
        v-model="modal"
        title="编辑部门"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="部门" prop="name">
            <Input v-model="formValidate.depart_name"></Input>
        </FormItem>
        <FormItem label="部门总监" prop="master">
            <Input v-model="formValidate.depart_master"></Input>
        </FormItem>
        <FormItem label="部门简介" prop="desc">
            <Input v-model="formValidate.depart_desc"></Input>
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>人事管理</BreadcrumbItem>
                <BreadcrumbItem>部门管理</BreadcrumbItem>
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="addOne">增加部门</Button>
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
                    title: '部门',
                    key: 'depart_name',
                },
                {
                    title: '部门总监',
                    key: 'depart_master'
                },
                {
                    title: '部门简介',
                    key: 'depart_desc'
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
            formValidate: {
                    depart_id: '',
                    depart_name: '',
                    depart_master: '',
                    depart_desc: '',
                    index:'',
                    username: '',
            },
            modal: false,
        }
    },
    methods: {
            addOne (){
                utility.initObject(this.formValidate)
                this.modal = true
            },
            // 现实弹窗对话
            show (index) {
                this.modal = true
                this.formValidate = Object.assign({}, this.data[index])
                this.formValidate.index = index
            },
            // 移除一条记录
            remove (index) {
                this.data[index].username = Cookies.get('username')
                let res = api.post('/api/departDelete', this.data[index])
                let that = this
                res.then(function(response){
                    that.data.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            // 对话框确定按钮点击事件
            ok () {
                if(this.formValidate.depart_name === '' || this.formValidate.depart_master === '' ||this.formValidate.depart_desc=== '' ){
                    this.$Message.error('填写不完整')
                    return
                }
                this.formValidate.username = Cookies.get('username')
                let res = api.post('/api/departUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    if(data.res){
                        that.$Message.success('添加成功')
                        let t = Object.assign({}, that.formValidate)
                        // console.log(t)
                        that.data.push(t)
                    }else{
                        utility.assginObject(that.data[that.formValidate.index], that.formValidate)
                        that.$Message.success('修改成功')
                    }
                })
            },
            cancel(){
            }
        },
    created () {
        let res = api.get('/api/depart')
        let that = this
        res.then(function(response){
            let {data, status} = response
            that.data = data.res
        })
    },
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