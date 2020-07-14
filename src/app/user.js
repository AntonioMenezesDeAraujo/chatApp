const uuidv4 = require('uuid/v4');
const users = [];

const addUser = ({ idUsuario }) => {
    const existingUser = users.find((user) => user.idUsuario === idUsuario);

    if (existingUser) {
        return { error: 'Usuario já está conectado' };
    }

    const user = { id:uuidv4(), idUsuario };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.idUsuario === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => user.idUsuario === id);
}

const findAll = () => {
    return users;
}


module.exports = { addUser, removeUser, getUser, findAll };