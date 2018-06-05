<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="form" :model="form" :rules="ruleValidate"> 
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit()" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import api from '../api/index'
    export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: ''
            },
            ruleValidate:{
                userName: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs['form'].validate((valid) => {
                let that = this
                    if (valid) {
                        let res = api.post('/api/login', {
                            username: this.form.userName,
                            password: this.form.password
                        })
                        res.then(function(response) {
                            let {data} = response
                            if(data.msg){
                                Cookies.set('username', that.form.userName)
                                that.$Message.success('登陆成功')
                                that.$router.push({
                                    name: 'home'
                                })
                            }else{
                                that.$Message.error('用户名或密码不正确填写')
                            }
                        })
                    } else {
                        this.$Message.error('用户名或密码不正确填写')
                    }
            })
        }
    },
    created () {
        Cookies.remove('username')
    }
};
</script>

<style lang="less">
.login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>

