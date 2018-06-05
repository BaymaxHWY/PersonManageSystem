<template>
    <div class="depart"> 
        <Modal
        v-model="modal"
        title="编辑信息"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="培训项目" prop="name">
            <Input v-model="formValidate.train_name"></Input>
        </FormItem>
        <FormItem label="培训地点" prop="place">
            <Input v-model="formValidate.train_place"></Input>
        </FormItem>
        <FormItem label="培训人数" prop="num">
            <InputNumber :max="100" :min="1" v-model="formValidate.train_num"></InputNumber>
        </FormItem>
        <FormItem label="培训时间" prop="dates">
            <DatePicker @on-change="formValidate.train_dates=$event" type="date" placement="bottom-end" format="yyyy-MM-dd" placeholder="选择时间" style="width: 200px" v-model="formValidate.train_dates"></DatePicker>
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>工作管理</BreadcrumbItem>
                <BreadcrumbItem>培训管理</BreadcrumbItem>
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="addOne">添加培训</Button>
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
                    title: '培训项目',
                    key: 'train_name',
                },
                {
                    title: '培训地点',
                    key: 'train_place'
                },
                {
                    title: '培训人数',
                    key: 'train_num'
                },
                {
                    title: '培训时间',
                    key: 'train_dates'
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
            formValidate: {
                    id: '',
                    train_name: '',
                    train_place:'',
                    train_num: 0,
                    train_dates:'',
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
            remove (index) {
                this.data[index].username = Cookies.get('username')
                let res = api.post('/api/trainDelete', this.data[index])
                let that = this
                res.then(function(response){
                    that.data.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            ok () {
                if(this.formValidate.train_name === ''||this.formValidate.train_place=== ''
                ||this.formValidate.train_num=== ''||this.formValidate.train_dates=== '' ){
                    this.$Message.error('填写不完整')
                    return
                }
                this.formValidate.username = Cookies.get('username')
                let res = api.post('/api/trainUpsert', this.formValidate)
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
        let res = api.get('/api/train')
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