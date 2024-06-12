const validator = require("../utils/integrity");
const { HttpError } = require('../utils/exceptions');


const validateRegister = (req, res, next) => {
    const { phone, password, firstname, lastname, address, sexe } = req.body;

    if (!phone || !password || !firstname || !lastname || !address || !sexe) {
        return res.status(400).json({
            message: "Veuillez fournir le numéro de téléphone, le mot de passe, le prénom, le nom de famille, l'adresse et le sexe",
            data: null,
        });
    }

    // Vérification des injections
    if (
        validator.hasInjection(phone) ||
        validator.hasInjection(password) ||
        validator.hasInjection(firstname) ||
        validator.hasInjection(lastname) ||
        validator.hasInjection(address)
    ) {
        return res.status(400).json({ message: "Caractères invalides détectés" });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res
            .status(400)
            .json({ message: "Veuillez fournir le login et le mot de passe", err: "log-1" });
    }

    // Vérification des injections
    if (validator.hasInjection(phone) || validator.hasInjection(password)) {
        return res
            .status(400)
            .json({ message: "Login ou mot de passe invalide", err: "log-2" });
    }

    // Vérifie si le login est un email ou un numéro de téléphone
    if (!validator.isPhone(phone)) {
        return res
            .status(400)
            .json({ message: "Le login devrait être un numéro de téléphone ", err: "log-3" });
    }

    next();
};



const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
        const user = await AuthService.getCurrentUser(token);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erreur du serveur' });
        }
    }

}


module.exports = {
    validateRegister,
    validateLogin,
    verifyToken

};

