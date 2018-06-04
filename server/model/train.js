const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('train', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    train_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '训练项目'
    },
    train_place: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '训练地点'
    },
    train_num: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '受训人数'
    },
    train_dates: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '训练时间'
    }
}, { timestamps: false, freezeTableName: true })