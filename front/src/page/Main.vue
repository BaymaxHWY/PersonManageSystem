<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="social-octocat"></Icon>
                            {{username}}
                        </MenuItem>
                        <MenuItem name="2">
                            <span><router-link to="/login">退出登陆</router-link></span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto" :open-names="['1', '2', '3']" :active-name="activeName">
                        <MenuItem name="activeName" @click.native="pageTo('home')"><Icon type="ios-home-outline"></Icon>&nbsp;&nbsp;首页</MenuItem>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                人事管理
                            </template>
                            <MenuItem name="depart" @click.native="pageTo('depart')">部门管理</MenuItem>
                            <MenuItem name="staff" @click.native="pageTo('staff')">员工管理</MenuItem>
                            <MenuItem name="recruit" @click.native="pageTo('recruit')">招聘管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                工作管理
                            </template>
                            <MenuItem name="2-1">培训管理</MenuItem>
                            <MenuItem name="2-2">奖惩管理</MenuItem>
                            <MenuItem name="2-2">薪资管理</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                设置
                            </template>
                            <MenuItem name="3-1">系统管理</MenuItem>
                            <MenuItem name="3-2">个人信息</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <router-view/>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
    export default {
        data () {
            return {
                username: 'admin',
                activeName: 'depart',
            }
        },
        created () {
            // console.log(Cookies.get('username'))
            this.username = Cookies.get('username') || ''
            if(this.username === ''){
                this.$router.push({
                    name: 'login'
                })
            }
            // console.log(this.$route.name)
            this.activeName = this.$route.name
        },
        methods: {
            pageTo (_name) {
                this.$router.push({
                    name: _name
                })
            }
        }
    }
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: url('../assets/logo.png');
    background-size: cover;
    background-position: center;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 15%;
    margin: 0 auto;
    margin-right: 10px;
}
a{
    color: #fff;
}
</style>