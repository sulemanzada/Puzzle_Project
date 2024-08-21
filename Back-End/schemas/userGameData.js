import mongoose, { Schema } from "mongoose";

const getDate = () => {
    const today = new Date();
    const midnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    const offset = midnight.getTimezoneOffset() * 60000;
    return new Date(midnight.getTime() - offset);
};

const userGameData = new mongoose.Schema({
    timeTaken: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    mistakesMade: {
        type: Number,
        required: true,
    },
    completedAt: {
        type: Date,
        default: getDate,
    },
    gridMatrix: [{ type: [Number], required: true }],
    userRef: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

const Game = mongoose.model("Game", userGameData);

export default Game;
