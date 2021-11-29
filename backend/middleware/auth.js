const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join( __dirname, '../env/private.key'), 'utf-8');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, privateKey);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Identifiant de l'utilisateur invalide";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête invalide')
        });
    }
};
