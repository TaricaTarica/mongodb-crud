const userHandler = require('./user/handler/userHandler');

module.exports = function routes(app) { 
    app.get('/error-codes', userHandler.errorCodes);
    app.post('/create', userHandler.create);
    app.post('/role', userHandler.addRoles);
    app.post('/auth', userHandler.auth);
}