    const validator = require("../utils/integrity");
    const bcrypt = require("bcryptjs");
    const mongoose = require("mongoose");
    const User = require("../models/User")
    const {Niveaux,Series} = require("../schemas/user")
    const jwt = require("jsonwebtoken");


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



    const validateCompleteRegistration = (req, res, next) => {

        const { niveau, serie, etablissement } = req.body;
        
        if (!niveau || !etablissement) {
            return res.status(400).json({
                message: "Veuillez fournir le niveau et l'établissement.",
            });
        }
    
        // Valider le niveau
        if (!Object.values(Niveaux).includes(niveau)) {
            return res.status(400).json({
                message: "Niveau invalide.",
            });
        }
    
        // Valider la série pour les niveaux SECOND et PREMIERE/TERMINAL
        if (niveau === Niveaux.SECOND && (!serie || !(Series.SCIENTIFIQUE.includes(serie) || Series.LITTERAIRE.includes(serie)))) {
            return res.status(400).json({
                message: `Série invalide pour le niveau ${niveau}`,
            });
        } else if ((niveau === Niveaux.PREMIERE || niveau === Niveaux.TERMINAL) && (!serie || !Series.SCIENTIFIQUE.includes(serie))) {
            return res.status(400).json({
                message: `Série invalide pour le niveau ${niveau}`,
            });
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


    const validateChangePassword = async (req, res, next) => {

        const { phone, oldPassword, newPassword } = req.body;
        const token = req.params.token;
    
        if (!phone || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "Veuillez fournir le numéro de téléphone, l'ancien mot de passe et le nouveau mot de passe." });
        }
    
        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const userId = payload.user.id;
    
            // Vérification si l'userId est un ObjectId valide
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Utilisateur invalide." });
            }
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }
    
            // Vérification si le numéro de téléphone correspond à celui de l'utilisateur trouvé
            if (user.phone !== phone) {
                return res.status(400).json({ message: "Numéro de téléphone incorrect." });
            }
    
            // Vérification de l'ancien mot de passe
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Ancien mot de passe incorrect." });
            }
    
            // Ajout de l'utilisateur à la requête pour le contrôleur
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    };



const validateForgotPassword = async (req, res, next) => {

    const { newPassword } = req.body;
    const { userId } = req.params;

    // Vérification des champs requis
    if (!userId || !newPassword) {
        return res.status(400).json({ message: "Veuillez fournir utilisateur et le nouveau mot de passe." });
    }

    try {
        // Vérification si l'utilisateur existe dans la base de données par userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé avec cet ID." });
        }

        // Ajout de l'utilisateur à la requête pour le contrôleur
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};



const validateResetPassword = async (req, res, next) => {

    const { phone, newPassword } = req.body;
  
    // Vérification des champs requis
    if (!phone || !newPassword) {
        return res.status(400).json({ message: "Veuillez fournir le numéro de téléphone et le nouveau mot de passe." });
    }
  
    try {
        // Vérification si l'utilisateur existe dans la base de données par numéro de téléphone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé avec ce numéro de téléphone." });
        }
  
        // Ajout de l'utilisateur à la requête pour le contrôleur
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
    
  };


const validateUpdateUserInfo = (req, res, next) => {

    const { phone, firstname, lastname, address } = req.body;

    if (!phone) {
        return res.status(400).json({ 

            message: 'Veuillez fournir le numéro de téléphone pour la vérification.' });
    }

    if (!firstname || !lastname || !address){

        return res.status(400).json({ 
            message: 'Veuillez fournir tous les champs de saisies' });
    }

    next();
};

    

  /*  

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
    */

    module.exports = {

        validateRegister,
        validateCompleteRegistration,
        validateLogin,
        validateChangePassword,
        validateForgotPassword,
        validateResetPassword,
        validateUpdateUserInfo

    };

