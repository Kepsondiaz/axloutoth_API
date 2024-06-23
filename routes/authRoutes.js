const express = require("express");
const middleware = require("../middlewares/authMiddleware.js");
const auth = require("../controllers/api/authControllers.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the authentication." });
});

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
router.post("/complete-registration/:userId", middleware.validateCompleteRegistration, auth.completeRegistration)



// Changer le mot de passe 
router.post("/change-password/:userId", middleware.validateChangePassword, auth.changePassword)


// Réinitialiser le mot de passe 
router.post("/reset-password/:userId", middleware.validateResetPassword, auth.resetPassword)


// Mettre a jour ces informations 
router.put("/update-info-user/:userId", middleware.validateUpdateUserInfo, auth.updateUserInfo)


module.exports = router;

