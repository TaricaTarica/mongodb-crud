const User = require('./../model/User');
const helpers = require('./../../helpers/helpers');

module.exports = {
    async create(user, res){
        if(!helpers.emailExists(user.email)){
            const newUser = new User({
                email: user.email,
                password: user.password,
                name: user.name,
                surname: user.surname
            });
        
            newUser.save().then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.json({ message: error });
            });
        }
        else{
            res.status(409).json({ 
                code: '101',
                message: 'Ups, user already exists!' 
            });
        }
        
    }
}