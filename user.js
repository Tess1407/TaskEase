let users = [];

const createUser = (id, username, email, password) => {
    const newUser = { id, username, email, password };
    users.push(newUser);
};

const getAllUsers = () => {
    return users;
};

module.exports = { createUser, getAllUsers };