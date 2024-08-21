import express from "express";
import {
    generateGame,
    resetGame,
    validateNumber,
} from "../controllers/sudokuController/sudokuController.js";

const router = express.Router();

router.post("/generate-game", generateGame);
router.post("/validate-number", validateNumber);
router.get("/reset-game", resetGame);

export default router;
