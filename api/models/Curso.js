"use strict";


module.exports = function CursoModelFactory(sequelize, DataTypes) {
    var Curso = sequelize.define("Curso", {
        nome: DataTypes.STRING,
        codigo: DataTypes.STRING,
        observacoes: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });

    Curso.associate = function(models) {

    }


    return Curso;
};
