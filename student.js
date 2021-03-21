const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        imePrezime:Sequelize.STRING,
        index:{
            type:Sequelize.STRING,
            unique:true
        }
    })
    return Student;
};
