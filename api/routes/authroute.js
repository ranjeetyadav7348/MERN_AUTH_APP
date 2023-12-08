import express from 'express'
import {signup,signin, google,signout, verify,PasswordReset} from '../controller/authcontroller.js'
import { sendMail } from '../controller/Mail.js';
const router=express.Router();
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signout);
router.post('/forgotpassword/send',sendMail);
router.post('/forgotpassword/passwordRest/setpassword',PasswordReset);
//router.post('/allu',sendMail);
export default router;