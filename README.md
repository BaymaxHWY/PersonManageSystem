# 前言
基于vue+koa2+mysql的小型人事管理系统，只是一个学校的课设作业，顺便练习一下koa+vue编写web应用

## 功能
- 部门、员工、招聘、培训、奖惩、薪资等的增删改查
- 登陆、注销
- 操作日志记录

#### **依赖安装**
```bash
cd front
npm i
cd server
npm i
```

#### **导入数据库**
> 将keshe.sql导入本地数据库

#### **本地运行**
```bash
cd front
npm run dev
cd server
node app.js
```

#### **技术栈**
vue2 +vue-router + webpack +ES6/7 + vux + koa2 + sequelize

#### **项目环境**
> Node版本8.0及以上 

#### **总结**
* vue中变量直接赋值是浅拷贝会造成改变一个变量其他变量也被改变的bug
* 基本上学会了koa后端的基本操作，相比于其他框架比较自由，可发挥程度大
* 这种应用是真的无聊，如果只是简单的增删改查的话，但是如果真的要做好的话，需要好好设计数据库的结构
