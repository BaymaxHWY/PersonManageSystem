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
        <FormItem label="员工编号" prop="master">
            <Input v-model="formValidate.staff_id"></Input>
        </FormItem>
        <FormItem label="员工职位" prop="desc">
            <Input v-model="formValidate.position"></Input>
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
            columns7: [
                {
                    title: '姓名',
                    key: 'name',
                },
                {
                    title: '员工编号',
                    key: 'staff_id'
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
                    position: '',
                },
        }
    },
    methods: {
            // update(){
            //     let res = api.get('/api/staff')
            //     let that = this
            //     res.then(function(response){
            //         let {data, status} = response
            //         that.data6 = data.res
            //     })
            // },
            show (index) {
                this.modal1 = true
                // console.log(index, this.data6[index].depart_name)
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
                if(this.formValidate.name === ''||this.formValidate.position=== '' ){
                    this.$Message.error('填写不完整')
                    return
                }
                let res = api.post('/api/staffUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    // console.log(data)
                    if(data.res){
                        that.$Message.success('添加成功')
                        that.data6.push(that.formValidate)
                    }else{
                        that.$Message.success('修改成功')
                    }
                    // console.log(response)
                    // that.data6 = data.res
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