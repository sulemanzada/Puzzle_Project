import express from "express";
import {
    getUserGameData,
    getGameHistory,
    postGameData,
    getGame,
} from "../controllers/userController.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/:id", verifyUserToken, getUserGameData);
router.post("/history/:id", verifyUserToken, getGameHistory);
router.post("/game-data", verifyUserToken, postGameData);
router.get("/game/:id", verifyUserToken, getGame);

export default router;
