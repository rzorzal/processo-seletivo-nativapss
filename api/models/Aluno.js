"use strict";


module.exports = function AlunoModelFactory(sequelize, DataTypes) {
    var Aluno = sequelize.define("Aluno", {
        nome: DataTypes.STRING,
        sobrenome: DataTypes.STRING,
        genero: DataTypes.STRING,
        identificacao: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });

    Aluno.associate = function(models) {

    }


    return Aluno;
};
