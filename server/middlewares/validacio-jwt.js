const jwt = require('jsonwebtoken');

const validacioJWT = (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Falta el token en la petició'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecte'
        });
    }


};

module.exports = {
    validacioJWT
};