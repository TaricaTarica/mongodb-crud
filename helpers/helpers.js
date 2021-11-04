const User = require('./../user/model/User');

module.exports ={
  emailExists: async function (email){
    try{
      const user = await User.findOne({ email: email });
      return user;
    }
    catch(error){
      console.log("Something went wrong: ", error);
    }
  },
  userAuth: async function (user, authEmail, authPassword){
    try{
      return (user.email == authEmail && user.password == authPassword);
    }
    catch(error){
      console.log("Something went wrong: ", error);
    }
  } 
}