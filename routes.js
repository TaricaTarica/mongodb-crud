const userHandler = require('./user/handler/userHandler');

module.exports = function routes(app) { 
    app.post('/create', userHandler.create);
}