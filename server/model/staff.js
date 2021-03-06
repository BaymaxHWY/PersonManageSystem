const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('staff', {
    staff_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '员工姓名'
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '员工职位'
    },
    depart: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '所属部门'
    },
    money: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '金额'
    }
}, { timestamps: false, freezeTableName: true })