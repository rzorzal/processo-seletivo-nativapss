"use strict";

const moment = require("moment");
const md5 = require("md5");

module.exports = function FuncionarioModelFactory(sequelize, DataTypes) {
    var  Funcionario = sequelize.define("FuncionarioSessao", {
        token: DataTypes.STRING,
        dataFechamento: DataTypes.DATE,
        dataAbertura: DataTypes.DATE,
    }, {
        freezeTableName: true,
        hooks: {
            beforeCreate: function(model, options, callback) {
                var dataAbertura = moment(model.dataAbertura || new Date() ).format();
                model.token = md5(Math.random() + dataAbertura + Math.random());
                callback();
            }
        }
    });

     Funcionario.associate = function(models) {
        Funcionario.belongsTo(models.Funcionario);
    }


    return  Funcionario;
};
