const userController = require('./../controller/userController');

module.exports = {
    errorCodes: async (req, res) => {
      try {
        userController.errorCodes(req, res);
      } catch (error) {
        res.status(400).json({ message: 'Bad request :(' });
        console.log(error);
      }
    },
    create: async (req, res) => {
      try {
        const user = req.body;
        userController.create(user, res);
      } catch (error) {
        res.status(400).json({ message: 'Bad request :(' });
        console.log(error);
      }
    },
    addRoles: async (req, res) => {
        try {
          const user = req.body;
          userController.addRoles(user, res);
        } catch (error) {
          res.status(400).json({ message: 'Bad request :(' });
          console.log(error);
        }
    },
    deleteRoles: async (req, res) => {
        try {
          const user = req.body;
          userController.deleteRoles(user, res);
        } catch (error) {
          res.status(400).json({ message: 'Bad request :(' });
          console.log(error);
        }
    },
    auth: async (req, res) => {
        try {
          const authUser = req.body;
          userController.auth(authUser, res);
        } catch (error) {
          res.status(400).json({ message: 'Bad request :(' });
          console.log(error);
        }
    },
}