const jwt = require('jsonwebtoken');

const {
  comparePassword,
  fetchUsers,
  fetchUserByIdFromDb,
  insertUserToDb,
  fetchUserByEmailFromDb,
  deleteUserByIdFromDb,
} = require('./../model/userOrm');

const tokenForUser = (id) => {
  return jwt.sign({
    sub: id,
    iat: new Date().getTime()
  }, process.env.JWT_SECRET);
};

module.exports = {
  findAllUsersApi: async (req, res) => {
    try {
      const users = await fetchUsers();
      res.json(users);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  findUserByIdApi: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await fetchUserByIdFromDb(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  createUserApi: async (req, res) => {
    //   any time user is sending data through a form
    //   we can pull that data out from the req.body object
    const { email, password } = req.body;
    try {
      // console.log('hit Controller', email, password)
      const newUser = await insertUserToDb(email, password);
      console.log(newUser)
      res.json(newUser);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  confirmUserApi: async (req, res) => {
    const { email, password } = req.body;
    console.log( email, password )
    try {
      const user = await fetchUserByEmailFromDb(email);
      const compare = await comparePassword(password, user.password)
      console.log(user.id)
      if (compare) {
        res.send(tokenForUser(user.id))
      } else {
        res.status(401).json('You are unauthorized')
      }
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteUserApi: async (req, res) => {
    res.send('need to implement delete')
  }
}
