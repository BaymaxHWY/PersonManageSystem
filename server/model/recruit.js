const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('recruit', {
    recruit_id: {
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
    intent_depart: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '意向部门'
    },
    intent_position: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '意向职位'
    },
    tel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '电话'
    },
    qq: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'qq'
    }
}, { timestamps: false, freezeTableName: true })