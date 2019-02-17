const Sequelize = require('sequelize');

const sequelize = new Sequelize('DATABASE',{
    dialect: 'sqlite',
    storage: '../db/DATABASE.sqlite'
});

sequelize.import(__dirname + 'items.js');