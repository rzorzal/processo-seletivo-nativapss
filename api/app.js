const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const RestFactory = require("./factories/restFactory");
const models = require('./models');

const app = express();

app.use(helmet());

const moment = require('moment');
const middlewares = require('./middlewares');
moment.locale("pt-br");

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());


const rest = RestFactory({
    sequelize: models.sequelize,
    app: app
})(middlewares.authorization.allowFuncionarioToken('token'));


let routes = require('./routes/index');


app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var scope = {
        success: false,
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
    };
    res.json(scope);
});


module.exports = app;
