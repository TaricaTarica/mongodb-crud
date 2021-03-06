const User = require('./../model/User');
const helpers = require('./../../helpers/helpers');

module.exports = {
    async errorCodes(req, res){
        errorCodes = [
            {
                code: '101',
                message: 'Ups, user already exists!' 
            },
            {
                code: '103',
                message: 'Ups, user not have that role'
            },
            { 
                code: '102',
                message: 'Ups, user not exists!' 
            },
            {
                code: '104',
                message: 'Ups, invalid credentials!' 
            }
        ];
        res.status(200).json(errorCodes);
    },
    async create(user, res){
        await helpers.emailExists(user.email).then(async (exists) =>{
            if(!exists){
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
        (error) => {
            console.log(">> Error: ", error);
            res.status(500).json({ message: 'Internal server error x_x' });
        });
        
        
    },
    async addRoles(user, res){
        await helpers.emailExists(user.email).then(async exists => {
            if(exists){
                await helpers.userAuth(exists, user.email, user.password).then(async auth => {
                    if(auth){
                        await User.updateOne({ email: user.email }, { $push: {roles: user.roles } }).then((data) =>{
                            if(data.acknowledged){
                                res.status(200).json({ message: 'Yay, roles added!' });
                            }
                            else{
                                res.status(400).json({ message: error });
                            }
                            
                        })
                        .catch((error) => {
                            res.status(500).json({ message: 'Internal server error x_x' });
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
    },
    async deleteRoles(user, res){
        await helpers.emailExists(user.email).then(async exists => {
            if(exists){
                await helpers.userAuth(exists, user.email, user.password).then(async auth => {
                    if(auth){
                        userHaventRoles = helpers.userHaventRoles(exists.roles, user.roles);
                        if(userHaventRoles != ''){
                            res.status(200).json({
                                "code": "103",
                                "message": `Ups, user not have the roles: ${userHaventRoles}`
                            });
                        }
                        else{
                            for(const existRole of exists.roles){
                                for(const role of user.roles){
                                    if(role.name == existRole.name){
                                        exists.roles.pull(existRole);
                                    }
                                }
                            }
                            await exists.save().then(result => {
                                res.status(200).json({ message: result});
                            })
                            .catch(error => {
                                console.log("Something was wrong: ", error);
                                res.status(500).json({ message: 'Internal server error x_x' });
                            });
                        }
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
    },
    async auth(authUser, res){
        await helpers.emailExists(authUser.email).then(async exists => {
            if(exists){
                await helpers.userAuth(exists, authUser.email, authUser.password).then(auth => {
                    res.status(200).json(auth);
                })
            }
            else{
                res.status(200).json(false);
            }
        })
    },
}