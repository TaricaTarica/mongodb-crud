const userController = require('./../controller/userController');

module.exports = {
    create: async (req, res) => {
      try {
        const user = req.body;
        userController.create(user, res);
      } catch (error) {
        res.status(500).json({  message: error  });
        console.log(error);
      }
    },
    addRoles: async (req, res) => {
        try {
          const roles = req.body;
          this.addRoles(roles, res);
        } catch (error) {
          console.log(error);
        }
    },
    deleteRoles: async (req, res) => {
        try {
          const roles = req.body;
          this.deleteRoles(roles, res);
        } catch (error) {
          console.log(error);
        }
    },
    auth: async (req, res) => {
        try {
          const authUser = req.body;
          this.auth(authUser, res);
        } catch (error) {
          console.log(error);
        }
    },
}