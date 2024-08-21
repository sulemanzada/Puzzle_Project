import express from "express";
import {
    signup,
    signin,
    securityQsSignin,
    update,
    addSecurityQs,
    signout,
    deleteUser,
} from "../controllers/authController.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/security-qs-sign-in", securityQsSignin);
router.put("/update/:id", verifyUserToken, update);
router.post("/add-security-question/:id", verifyUserToken, addSecurityQs);
router.get("/sign-out/:id", verifyUserToken, signout);
router.delete("/delete/:id", verifyUserToken, deleteUser);

export default router;
