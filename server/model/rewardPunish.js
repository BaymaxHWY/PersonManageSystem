const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('reward_punish', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '姓名'
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '类型'
    },
    money: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '金额'
    }
}, { timestamps: false, freezeTableName: true })