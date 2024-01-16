import express from 'express'
import {signup,signin, google,signout, verify,PasswordReset, Chatgpt, getallPosts} from '../controller/authcontroller.js'
import { sendMail } from '../controller/Mail.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signout);
router.post('/forgotpassword/send',sendMail);
router.post('/chat',Chatgpt);
router.post('/forgotpassword/passwordRest/setpassword', PasswordReset);
router.post('/posts',getallPosts);

//router.post('/allu',sendMail);
export default router;