const { createUser, getUser, updateUser, deleteUser } = require('./userController');
const { login, register } = require('./authController');

module.exports = {
    paths: {
        "/api/users": {
            ...createUser,
            ...getUser,
            ...updateUser,
            ...deleteUser,
        },
        "/api/login": {
            ...login,
        },
        "/api/register": {
            ...register,
        },
    }
}