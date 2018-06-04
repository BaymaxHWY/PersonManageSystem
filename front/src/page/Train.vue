<template>
    <div class="depart"> 
        <Modal
        v-model="modal1"
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
            <Input v-model="formValidate.train_num"></Input>
        </FormItem>
        <FormItem label="培训时间" prop="dates">
            <DatePicker type="date" placement="bottom-end" format="yyyy-MM-dd" placeholder="选择时间" style="width: 200px" v-model="formValidate.train_dates"></DatePicker>
        </FormItem>
    </Form>
    </Modal>
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>工作管理</BreadcrumbItem>
                <BreadcrumbItem>培训管理</BreadcrumbItem>
                <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="modal1=true">添加培训</Button>
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
            columns7: [
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
            data6: [],
            modal1: false,
            formValidate: {
                    id: '',
                    train_name: '',
                    train_place:'',
                    train_num: '',
                    train_dates:'',
                },
        }
    },
    computed: {
        
    },
    methods: {
            show (index) {
                this.modal1 = true
                this.formValidate = this.data6[index]
            },
            remove (index) {
                let res = api.post('/api/trainDelete', this.data6[index])
                let that = this
                res.then(function(response){
                    that.data6.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            ok () {
                // this.$Message.info('Clicked ok');
                if(this.formValidate.train_name === ''||this.formValidate.train_place=== ''
                ||this.formValidate.train_num=== ''||this.formValidate.train_dates=== '' ){
                    this.$Message.error('填写不完整')
                    return
                }
                // console.log(index)
                // this.formValidate.train_dates = this.formValidate.train_dates.substring(0, 10)
                // console.log(this.formValidate.train_dates.getDate())
                let res = api.post('/api/trainUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    // console.log(data)
                    if(data.res){
                        that.$Message.success('添加成功')
                        that.data6.push(that.formValidate)
                        that.formValidate = {
                            id: '',
                            train_name: '',
                            train_place:'',
                            train_num: '',
                            train_dates:'',        
                        }
                        return
                    }else{
                        this.formValidate = {
                            id: '',
                            train_name: '',
                            train_place:'',
                            train_num: '',
                            train_dates:'',        
                        }
                        that.$Message.success('修改成功')
                        return
                    }
                    that.$Message.error('操作失败')
                })
            },
            cancel(){
                this.formValidate = {
                            id: '',
                            train_name: '',
                            train_place:'',
                            train_num: '',
                            train_dates:'',        
                        }
            }
        },
    created () {
        let res = api.get('/api/train')
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