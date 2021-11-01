const User = require('./../user/model/User');

module.exports ={
  emailExists: async function (email){
    try{
      const user = await User.findOne({ email: email });
      if(user){
        return true;
      }
      else{
        return false;
      }
    }
    catch(error){
      console.log("Something went wrong: ", error);
    }
  },
  userAuth: async function (email, password){
    try{
      await User.findOne({ 
        email: email , 
        password: password 
      }, function(error, result){
        if(error){
          console.log("Something went wrong: ", error);
          return false;
        }
        else{
          console.log("result: ", result);
          return true;
        }
      });
      if(user){
        return true;
      }
      else{
        return false;
      }
    }
    catch(error){
      console.log("Something went wrong: ", error);
    }
  } 
}