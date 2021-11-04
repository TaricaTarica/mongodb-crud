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
                res.status(400).json({ message: error });
            });
        }
        else{
            res.status(409).json({ 
                code: '101',
                message: 'Ups, user already exists!' 
            });
        }
        
    },
    async addRoles(user, res){
        await helpers.emailExists(user.email).then(async exists => {
            if(exists){
                await helpers.userAuth(exists, user.email, user.password).then(async auth => {
                    if(auth){
                        await User.updateOne({ email: user.email }, {roles: user.roles }).then((data) =>{
                            if(data.acknowledged){
                                res.status(200).json({ message: 'Yay, roles added!' });
                            }
                            else{
                                res.status(400).json({ message: error });
                            }
                            
                        })
                        .catch((error) => {
                            res.status(400).json({ message: error });
                        })     
                    }
                    else{
                        res.status(404).json({
                            code: '104',
                            message: 'Ups, invalid credentials!' 
                        });
                    }
                });
            }
            else{
                res.status(404).json({ 
                    code: '102',
                    message: 'Ups, user not exists!' 
                });
            }
        });
    }
}