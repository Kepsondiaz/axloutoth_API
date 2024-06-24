const express = require("express");
const middleware = require("../../middlewares/authMiddleware.js");
const auth = require("../../controllers/api/authControllers.js");
const router = express.Router();

/**
 * @swagger
 * @tags: ['Users']
 * ...
 */

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the authentication." });
});

router.get('/get-all-complete-users', auth.getAllCompleteUsers);

/**
 * @desc Route to register user
 * @route POST api/users
 * @access Private available for Admin
 */
router.post("/register", middleware.validateRegister, auth.authRegisterUser)

/**
 * @desc Route to log a user
 * @route POST api/users
 * @access Private available for Admin
 */
router.post("/login", middleware.validateLogin, auth.authLoginUser)


// Completer la creation de compte  
router.post("/complete-registration/:token", middleware.validateCompleteRegistration, auth.completeRegistration)


// Envoyer le code de parainage à un autre utilisateur
router.post("/send-reffaral-link/:token", auth.sendReferralLink)

// Changer le mot de passe 
router.post("/change-password/:token", middleware.validateChangePassword, auth.changePassword)


// Réinitialiser le mot de passe 
router.post("/reset-password/", middleware.validateResetPassword, auth.resetPassword)


// Mettre a jour ces informations 
router.put("/update-info-user/:token", middleware.validateUpdateUserInfo, auth.updateUserInfo)


module.exports = router;

