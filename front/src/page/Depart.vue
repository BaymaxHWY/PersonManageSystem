<template>
    <div class="depart"> 
        <Modal
        v-model="modal1"
        title="编辑部门"
        @on-ok="ok"
        @on-cancel="cancel">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="部门" prop="name">
            <Input v-model="formValidate.depart_name"></Input>
        </FormItem>
        <FormItem label="部门主管" prop="master">
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
                <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <Button type="ghost" icon="plus" class="addBtn" @click="modal1=true">增加部门</Button>
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
                    title: '部门',
                    key: 'depart_name',
                },
                {
                    title: '部门主管',
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
            data6: [],
            modal1: false,
            formValidate: {
                    depart_id: '',
                    depart_name: '',
                    depart_master: '',
                    depart_desc: '',
                },
        }
    },
    methods: {
            show (index) {
                this.modal1 = true
                console.log(index, this.data6[index].depart_name)
                this.formValidate = this.data6[index]
            },
            remove (index) {
                let res = api.post('/api/departDelete', this.data6[index])
                let that = this
                res.then(function(response){
                    that.data6.splice(index, 1)
                    that.$Message.success('删除成功')
                })
            },
            ok () {
                // this.$Message.info('Clicked ok');
                if(this.formValidate.depart_name === '' || this.formValidate.depart_master === '' ||this.formValidate.depart_desc=== '' ){
                    this.$Message.error('填写不完整')
                    return
                }
                let res = api.post('/api/departUpsert', this.formValidate)
                let that = this
                res.then(function(response){
                    let {data, status} = response
                    // console.log(data)
                    if(data.res){
                        that.$Message.success('添加成功')
                        that.data6.push(that.formValidate)
                        that.formValidate = {
                            depart_id: '',
                            depart_name: '',
                            depart_master: '',
                            depart_desc: '',
                        }
                    }else{
                        that.formValidate = {
                            depart_id: '',
                            depart_name: '',
                            depart_master: '',
                            depart_desc: '',
                        }
                        that.$Message.success('修改成功')
                    }
                })
            },
            cancel(){
                this.formValidate = {
                    depart_id: '',
                    depart_name: '',
                    depart_master: '',
                    depart_desc: '',
                }
            }
        },
    created () {
        
        let res = api.get('/api/depart')
        let that = this
        res.then(function(response){
            let {data, status} = response
            that.data6 = data.res
        })
        // this.$nextTick(updateOpened)
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