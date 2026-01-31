const Sequelize = require('sequelize');

const sequelize = new Sequelize('librarypawremed', 'root', 'Velascoggbanget1', {
    host: '127.0.0.1',
    port: 3309,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
