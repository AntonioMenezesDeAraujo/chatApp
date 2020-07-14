const User = require('../models/User');
const jwt = require('jsonwebtoken')
const jwtSecret = require('../configJWT/auth');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const config = require('../../config/database');

const sequelize = new Sequelize(config)

class UserController {
    async store(req, res) {
        const { nome, apelido, senha } = req.body;
        const { key } = req.file;

        if (!nome) {
            return res.status(200).json({ erro: 'O campo nome deve ser preenchido' });
        }

        if (!apelido) {
            return res.status(200).json({ erro: 'O campo apelido deve ser preenchido' });
        }

        if (!senha) {
            return res.status(200).json({ erro: 'O campo senha deve ser preenchido' });
        }

        if (!req.file) {
            return res.status(200).json({ erro: 'O campo foto deve ser preenchido' });
        }

        const responseUsuarioExiste = await sequelize.query(
            "select exists(select 1 from users where upper(apelido) = upper(:user))",
            {
                replacements: { 'user': apelido },
                type: QueryTypes.SELECT
            }
        );
        const {exists} = responseUsuarioExiste[0];

        if(exists==true || exists === true){
            return res.status(200).json({ erro: 'Já existe um usuario com este apelido!' });
        }

        const user = await User.create({ nome, apelido, senha, key });

        return res.json({ user, token: jwt.sign({ user: user.id }, jwtSecret.secret, { expiresIn: 86400 }) });
    }

    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async login(req, res) {
        const { apelido, senha } = req.body;


        if (!apelido) {
            return res.status(200).json({ erro: 'Deve ser digitado um apelido' });
        }

        if (!senha) {
            return res.status(200).json({ erro: 'Deve ser digitado uma senha' });
        }

        const user = await User.findOne({ where: { apelido, senha } });

        if (!user) {
            return res.status(200).json({ erro: 'Não existe usuário com o login e senha digitados' });
        }

        return res.status(200).json({ user, token: jwt.sign({ user: user.id }, jwtSecret.secret, { expiresIn: 86400 }) });
    }

    async getById(req, res) {
        const user = await User.findOne({ where: { id: req.params.id } });
        return res.status(200).json({ user });
    }


    async findConnections(req, res) {
        const response = await sequelize.query(
            "select u.* from users u where u.id not in  (select solicitado_id from favorites  where solicitante_id = :idUser)",
            {
                replacements: { 'idUser': req.params.id },
                type: QueryTypes.SELECT
            }
        );
        return res.status(200).json({ favoritos: response });
    }

    async findFavorites(req, res) {
        const response = await sequelize.query(
            "select u2.* from users u inner join favorites f on u.id = f.solicitante_id inner join users u2 on u2.id = f.solicitado_id where ativo and f.solicitante_id = :idUser",
            {
                replacements: { 'idUser': req.params.id },
                type: QueryTypes.SELECT
            }
        );
        return res.status(200).json({ favoritos: response });
    }
}

module.exports = new UserController();