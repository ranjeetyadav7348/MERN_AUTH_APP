import express  from "express";
import {test, updateUser,deleteUser} from '../controller/usercontroller.js'
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();
//console.log("jnaf")
router.get('/',test);
router.post("/update/:id",verifyToken,updateUser);
router.delete("/delete/:id",verifyToken,deleteUser);
export default router;