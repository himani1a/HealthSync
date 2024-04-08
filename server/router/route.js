import { Router } from "express";
const router = Router();

//import controller
import * as controller from "../controller/appController.js";
import { registerMail } from "../controller/mailer.js";
import Auth, {localVariables} from "../middleware/auth.js";

/** POST method */
router.route('/signup').post(controller.signup);
router.route('/registerMail').post(registerMail); //send email 
router.route('/authenticate').post((req, res) => res.end());    //autheticate user
router.route('/login').post(controller.verifyUser, controller.login);    //login in app

/** GET methods */
router.route('/user/:username').get(controller.getUser) //user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)    //generate OTP
router.route('/verifyOTP').get(controller.verifyOTP) //verify OTP
router.route('/createResetSession').get(controller.createResetSession) //reset all variables

/** PUT methods */
router.route('/updateuser').put( Auth, controller.updateUser); //update user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); //use to reset password

export default router;