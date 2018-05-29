"use strict";

const bcrypt = require('bcryptjs');

module.exports = function FuncionarioModelFactory(sequelize, DataTypes) {
    var Funcionario = sequelize.define("Funcionario", {
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
    }, {
        freezeTableName: true,
        hooks: {
            beforeUpdate: function(models, options,callback) {
                if(options.fields.indexOf('senha') == -1){
                    callback();
                    return;
                }
                var salt = bcrypt.genSaltSync();
                models.senha = bcrypt.hashSync(models.senha, salt);
                callback();
            },
            beforeCreate: function(models, options,callback) {
                if(!models.senha){
                    callback();
                    return;
                }
                var salt = bcrypt.genSaltSync();
                models.senha = bcrypt.hashSync(models.senha,salt);
                callback();
            }
        },
        instanceMethods: {
            authenticate: function(password) {
                if (bcrypt.compareSync(password, this.senha)) return this;
                else return false;
            }
        },
    });

    Funcionario.associate = function(models) {
        Funcionario.hasMany(models.FuncionarioSessao);
    }


    return Funcionario;
};
