const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('log', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '用户名'
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'ip地址'
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: '操作时间'
    },
    user_desc: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '操作描述'
    }
}, { timestamps: false, freezeTableName: true })