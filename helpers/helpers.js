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
          console.log("Something went wrong: ", error)
      }
  }
}