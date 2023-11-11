const createUser = require('./createUser');
const getUserByEmail = require('./getUserByEmail');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
getAllUsers = require('./getAllUsers');

module.exports = {
    createUser: createUser,
    getUserByEmail: getUserByEmail,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers,
}