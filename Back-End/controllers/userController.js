import mongoose from "mongoose";
import Game from "../schemas/userGameData.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getUserGameData = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id)
            throw errorHandler(401, "User authentication failed");

        const games = await Game.find({ userRef: req.params.id }).sort({
            completedAt: 1,
        });

        const times = await Game.aggregate([
            {
                $match: {
                    userRef: new mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                $group: {
                    _id: "$difficulty",
                    shortestTime: { $min: "$timeTaken" },
                    longestTime: { $max: "$timeTaken" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        const easyGames = {
            played: 0,
            mistakes: 0,
            shortestTime: null,
            longestTime: null,
        };
        const mediumGames = {
            played: 0,
            mistakes: 0,
            shortestTime: null,
            longestTime: null,
        };
        const hardGames = {
            played: 0,
            mistakes: 0,
            shortestTime: null,
            longestTime: null,
        };

        for (let i = 0; i < times.length; i++) {
            const id = times[i]._id;
            const short = times[i].shortestTime;
            const long = times[i].longestTime;

            if (id === "easy") {
                easyGames.shortestTime = short;
                easyGames.longestTime = long;
            }
            if (id === "medium") {
                mediumGames.shortestTime = short;
                mediumGames.longestTime = long;
            }
            if (id === "hard") {
                hardGames.shortestTime = short;
                hardGames.longestTime = long;
            }
        }

        let totalTime = 0;

        for (let i = 0; i < games.length; i++) {
            const difficulty = games[i].difficulty;
            const mistakes = games[i].mistakesMade;

            if (difficulty === "easy") {
                easyGames.played += 1;
                easyGames.mistakes += mistakes;
            }
            if (difficulty === "medium") {
                mediumGames.played += 1;
                mediumGames.mistakes += mistakes;
            }
            if (difficulty === "hard") {
                hardGames.played += 1;
                hardGames.mistakes += mistakes;
            }

            totalTime += games[i].timeTaken;
        }

        const totalMistakes =
            easyGames.mistakes + mediumGames.mistakes + hardGames.mistakes;

        const stats = {
            firstGame: games[0]?.completedAt || null,
            gamesPlayed: games?.length || 0,
            totalTime,
            totalMistakes,
            easyGames,
            mediumGames,
            hardGames,
        };

        res.status(200).json({ success: true, stats });
    } catch (error) {
        next(error);
    }
};

export const getGameHistory = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id)
            throw errorHandler(401, "User authentication failed");

        const limit = req.query.limit || 9;
        const startIndex = req.query.startIndex || 0;
        const { from, to, difficulties, mistakesMade, timeTaken, sort, order } =
            req.body;
        const query = {
            userRef: req.params.id,
        };

        if (from && to) {
            query["completedAt"] = { $gte: from, $lte: to };
        } else if (from) {
            query["completedAt"] = { $gte: from };
        } else if (to) {
            query["completedAt"] = { $lte: to };
        }

        if (difficulties && difficulties.length > 0) {
            const d = difficulties.map((d) => d.toLowerCase());
            query["difficulty"] = { $in: d };
        }

        if (mistakesMade && mistakesMade.length > 0) {
            query["mistakesMade"] = { $in: mistakesMade };
        }

        if (timeTaken) {
            query["timeTaken"] = { $lte: timeTaken };
        }

        const gameData = await Game.find(query)
            .sort({
                [sort]: order,
            })
            .limit(limit)
            .skip(startIndex);

        res.status(200).json({ success: true, gameData });
    } catch (error) {
        next(error);
    }
};

export const postGameData = async (req, res, next) => {
    try {
        const { timeTaken, difficulty, mistakesMade, gridMatrix, userRef } =
            req.body;

        if (req.user.id !== userRef)
            throw errorHandler(401, "User authentication failed");

        const gameData = await Game.create({
            timeTaken,
            difficulty,
            mistakesMade,
            gridMatrix,
            userRef,
        });
        res.status(201).json({ success: true, gameData });
    } catch (error) {
        next(error);
    }
};

export const getGame = async (req, res, next) => {
    try {
        const gameData = await Game.findById(req.params.id);

        if (req.user.id !== gameData.userRef.toString())
            throw errorHandler(401, "User authentication failed");

        res.status(200).json({
            success: true,
            gridMatrix: gameData.gridMatrix,
        });
    } catch (error) {
        next(error);
    }
};
