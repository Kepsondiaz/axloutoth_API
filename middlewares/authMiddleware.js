const validator = require("../utils/integrity");

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

module.exports = {
    validateRegister,
    validateLogin,
};
