var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var middlewares = require(process.cwd() + "/middlewares");


router.post('/authenticate', middlewares.authorization.allowCrossOrigin(), async function(req, res) {

    let transaction = await models.sequelize.transaction();

    try{
        console.log(req.body);
        let {senha, login} = req.body;

        let funcionario = await models.Funcionario.findOne({
            where: {
                login: login
            }
        });

        if(!funcionario){
            res.json({
                code: 2,
                success: false,
                message: "Login ou Senha inválidos"
            });
            return;
        }

        const canLogin = funcionario.authenticate(senha);

        if(!canLogin){
            res.json({
                code: 1,
                success: false,
                message: "Login ou Senha inválidos"
            });
            return;
        }

        let sessoes = await models.FuncionarioSessao.findAll({
            where: {
                dataFechamento: null,
                FuncionarioId: funcionario.id
            }
        });

        let proms = sessoes.map(s => s.update({dataFechamento: new Date()}, {transaction} ));
        await Promise.all(proms);


        let sessao = await models.FuncionarioSessao.create({
            dataAbertura: new Date(),
            FuncionarioId: funcionario.id
        }, {transaction});

        await transaction.commit();

        res.json({
            success: true,
            data: sessao
        });

    }catch(err){

        console.log(err);
        res.json({
            success: false,
            message: err.message,
            stack: err.stack
        });
        await transaction.rollback();
    }

});


module.exports = router;
