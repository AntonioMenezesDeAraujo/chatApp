const jwt = require('jsonwebtoken');

const authConfig = require('../configJWT/auth.json');

module.exports = (req, res, next) => {

    if(req.url ==='/login' || (req.method === 'POST' && req.url === '/user')) {
        return next();
    }
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No Token provided' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Tokenmalformatted' });
    }

    jwt.verify(token, authConfig.secret, (err, decode) => {
        if (err) {
            return res.status(401).send({ error: 'Token invalid' });
        }

        req.userId = decode.id;
        return next();
    })
}