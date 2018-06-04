const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('depart', {
    depart_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    depart_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '部门名'
    },
    depart_master: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '部门主管'
    },
    depart_desc: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '部门简介'
    }
}, { timestamps: false, freezeTableName: true })