const validator = require("../utils/integrity");
const AuthService = require('../services/auth/authService');
const { HttpError } = require("../utils/exceptions");

const validateRegister = (req, res, next) => {
    const { email, phone, password, role } = req.body;

    if ((!email && !phone) || !password || !role) {
        return res.status(400).json({
            message: "Veuillez fournir l'email, le numéro de téléphone, le rôle et le mot de passe",
            data: null,
        });
    }

    // Vérification et validation de l'intégrité des données
    let invalid = [];
    if (email !== undefined && !validator.isEmail(email)) {
        invalid.push("email invalide");
    }

    if (role !== undefined && !validator.isRole(role)) {
        invalid.push("rôle invalide");
    }

    if (phone && !validator.isPhone(phone)) {
        invalid.push("numéro de téléphone invalide");
    }

    // Vérification des injections
    if (
        validator.hasInjection(password) ||
        validator.hasInjection(email) ||
        validator.hasInjection(phone)
    ) {
        invalid.push("caractères invalides");
    }

    if (invalid.length > 0) {
        return res
            .status(400)
            .json({ message: `erreurs: ${invalid.join(", ")}!`, data: null });
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
    let isPhone = validator.isPhone(phone);

    if (!isPhone) {
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
