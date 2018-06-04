const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('system',{
    system_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '密码'
    }
}, { timestamps: false, freezeTableName: true})