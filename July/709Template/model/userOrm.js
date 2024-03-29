const bcrypt = require('bcryptjs');
const {
  findAllUsers,
  findUserByIdQuery,
  findUserByEmail,
  insertUserQuery,
  deleteUserByIdQuery,
} = require('./userQueries');
const connection = require('./../config/connection');

//1st parameter is the password that the person trying to sign in is providing us
// the 2nd parameter is the actual password that's in the database
const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// All ORM functions will be called inside of the Controllers
const fetchUserByEmailFromDb = async (email) => {
  try {
    const [rows] = await connection.query(findUserByEmail, email);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Gets
const fetchUsers = async () => {
  try {
    const [rows] = await connection.query(findAllUsers);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchUserByIdFromDb = async (userId) => {
  try {
    // Returns an array
    // First element in the array are the rows  []
    // 2nd element is information about the db and the fields
    // rows is 1 user in an array
    // [  [ { id: 1, password: 'sasuidgayidgada', username: 'lalal' }] , { ...infoaboutDb } ]
    const [rows] = await connection.query(findUserByIdQuery, userId); //
    // and because ID's are guaranteed to be unique
    //  [ { id: 1, password: 'sasuidgayidgada', username: 'lalal' } ]
    // we know for sure that the first element is the user we found
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Insert
const insertUserToDb = async (email, password) => {
  // going to generate some random String to add on to our hashed password once we start hashing it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    // console.log('hello from ORM', insertUserQuery)
    const [result] = await connection.query(insertUserQuery, [email, hashedPassword], (err, res) => {
      // console.log('hello', res)
    });
    const [userResult] = await connection.query(findUserByIdQuery, result.insertId);
    // console.log(result, userResult)
    return userResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

//Delete
const deleteUserByIdFromDb = async (userId) => {
  try {
    const [rows] = await connection.query(findUserByIdQuery, userId);
    await connection.query(deleteUserByIdQuery, userId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  comparePassword,
  fetchUsers,
  fetchUserByIdFromDb,
  fetchUserByEmailFromDb,
  insertUserToDb,
  deleteUserByIdFromDb,
};
