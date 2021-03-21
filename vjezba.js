const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Vjezba = sequelize.define("vjezba",{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        naziv:{
            type:Sequelize.STRING,
            unique:true
        },
        spirala:Sequelize.BOOLEAN
    })
    return Vjezba;
};
