import Vue from 'vue'
import Router from 'vue-router'

import Main from '../page/Main.vue'
import Login from '../page/Login.vue'
import Home from "../page/Home.vue"
import Depart from "../page/Depart.vue"
import Staff from "../page/Staff.vue"
import Recruit from "../page/Recruit.vue"
import Train from "../page/Train.vue"
import RewardPunish from "../page/RewardPunish.vue"
import Wage from "../page/Wage.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: { title: '首页' }
        },
        {
          path: 'depart',
          name: 'depart',
          component: Depart,
          meta: { title: '部门管理' }
        },
        {
          path: 'staff',
          name: 'staff',
          component: Staff,
          meta: { title: '员工管理' }
        },
        {
          path: 'recruit',
          name: 'recruit',
          component: Recruit,
          meta: { title: '招聘管理' }
        },
        {
          path: 'train',
          name: 'train',
          component: Train,
          meta: { title: '培训管理' }
        }, 
        {
          path: 'rewardPunish',
          name: 'rewardPunish',
          component: RewardPunish,
          meta: { title: '奖惩管理' }
        },
        {
          path: 'wage',
          name: 'wage',
          component: Wage,
          meta: { title: '薪资管理' }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
  ]
})
