const findAllUsers = 'SELECT id, email FROM users;';
const findUserByIdQuery = 'SELECT id, email FROM users WHERE id = ?;';
const findUserByEmail = 'SELECT id, email, password FROM users WHERE email = ?;';
const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?);';
const deleteUserByIdQuery = 'DELETE FROM users WHERE ID = ?;';

module.exports = {
  findAllUsers,
  findUserByIdQuery,
  findUserByEmail,
  insertUserQuery,
  deleteUserByIdQuery,
};
