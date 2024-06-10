const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Récupérer le token depuis le header
    const token = req.header('x-auth-token');

    // Vérifiez si le token existe
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secret'); // Utilisez la même chaîne secrète que lors de la génération du token
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
