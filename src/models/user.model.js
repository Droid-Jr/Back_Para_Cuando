const  { DataTypes } = require('sequelize');
const db = require('../config/database');

const user = db.define('users',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING ,
        allowNull : true
    },
    lastname : {
        type : DataTypes.STRING,
        allowNull :true
    },
    profileImg : {
        type : DataTypes.STRING,
        allowNull :true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
     password : {
        type : DataTypes.STRING,
        allowNull : false
     },
     confirEmail : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
     }
}
);

module.exports = user