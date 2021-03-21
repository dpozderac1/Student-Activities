const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Godina = sequelize.define("godina",{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        nazivGod:{
            type:Sequelize.STRING,
            unique:true
        },
        nazivRepSpi:Sequelize.STRING,
        nazivRepVje:Sequelize.STRING
    })
    return Godina;
};
