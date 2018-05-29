var models  = require('../../models');

module.exports = function AllowFuncionarioTokenMiddlewareFactory(tokenParamName){
    return async function AllowFuncionarioTokenMiddleware(req, res, next){
        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MIDDLEWARE ALLOWFUNCIONARIOTOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        var token = req.query[tokenParamName];

        if(!token){
            res.json({error: 1, msg: "Token de funcionário não encontrado!"});
            return;
        }

        var hasToken = await models.FuncionarioSessao.findOne({
            where: {
                token: token
            },
            include: [models.Funcionario]
        });

        if(!hasToken){
            res.json({
                error: 1,
                msg: "Token de funcionário inválido"
            });
            return;
        }

        if(hasToken.dataFechamento){
            res.json({
                error: 1,
                msg: "Token de funcionário expirado"
            });
            return;
        }

        if(!req.contexto) req.contexto = {};
        req.contexto.funcionario = await models.Funcionario.findOne({
            where: {
                id: hasToken.FuncionarioId
            }
        });
        req.contexto.sessao = hasToken

        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MIDDLEWARE ALLOWFUNCIONARIOTOKEN FIM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");
        next();
    }
}
