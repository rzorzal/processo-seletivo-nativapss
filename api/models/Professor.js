"use strict";


module.exports = function ProfessorModelFactory(sequelize, DataTypes) {
    var Professor = sequelize.define("Professor", {
        nome: DataTypes.STRING,
        sobrenome: DataTypes.STRING,
        genero: DataTypes.STRING,
        identificacao: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });

    Professor.associate = function(models) {

    }


    return Professor;
};
