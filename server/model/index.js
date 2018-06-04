const config = require('config')
const Sequelize = require('sequelize')

let {host, database, user, password} = config.mysql

module.exports = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    logging: false
})