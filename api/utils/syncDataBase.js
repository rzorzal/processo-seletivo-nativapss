String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var env = process.env.NODE_ENV || "development";
var models = require(`${process.cwd()}/models`);
var config = require(`${process.cwd()}/config/config.json`)[env];

if(env.toUpperCase() != "development".toUpperCase()){
    config.dummy = process.env[config.dummy_env];
}

async function initialData(){
    let funcionario = await models.Funcionario.findOne({
        where: {
            login: "admin"
        }
    });
    if(!funcionario){
        funcionario = await models.Funcionario.create({
            login: "admin",
            senha: "admin"
        });
    }
    return funcionario;
}


module.exports = async function SequelizePostgresSyncDataBase(){
    console.log("============ Syncing DataBase ============");
    await models.sequelize.sync({ alter: false, force: false });
    let diffSQL = await models.sequelize.syncDiff(config.dummy);
    console.log("============ Syncing DataBase Timezone ============");
    await models.sequelize.query(`set timezone TO '${process.env.TZ}';`,{
        type: models.sequelize.QueryTypes.SELECT
    });
    console.log("============ Syncing DataBase Tables ============");
    await models.sequelize.query(diffSQL.replaceAll("\"\"","\""),{
        type: models.sequelize.QueryTypes.SELECT
    });
    console.log("============ Synced DataBase ============");
    await initialData();
}
