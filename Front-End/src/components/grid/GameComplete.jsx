import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameComplete } from "../../redux/sudokuSlice";
import axios from "../../utils/axiosInstance";
import FullScreenSpinner from "../FullScreenSpinner";
import { cookieExpired } from "../../redux/userSlice.js";

const GameComplete = ({ board, onClick, mistakes }) => {
    const dispatch = useDispatch();
    const { gameComplete, time, difficulty } = useSelector(
        (state) => state.sudoku
    );
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    const mins = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        checkCompletion(board);
    }, [board]);

    async function checkCompletion(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (!board[row][col]) return false;
            }
        }

        if (currentUser) await saveGameData();

        dispatch(setGameComplete());
    }

    const saveGameData = async () => {
        setLoading(true);

        try {
            await axios.post(
                "/api/user/game-data",
                {
                    timeTaken: time,
                    difficulty,
                    mistakesMade: mistakes,
                    gridMatrix: board,
                    userRef: currentUser._id,
                },
                { withCredentials: true }
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.message);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    return gameComplete && !loading ? (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 w-full h-full flex items-center justify-center">
            <div className="bg-white rounded-lg border border-black max-w-[80%] p-5 text-xl">
                Good job! You have completed this sudoku board with {mistakes}{" "}
                mistake(s).
                <br />
                <br />
                Your time was:{" "}
                {mins + " minute(s) and " + seconds + " second(s)"}
                <br />
                <br />
                Your difficulty was:{" "}
                {difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1)}
                <br />
                <br />
                <button
                    className="w-full bg-blue-500 p-3 text-white font-bold text-xl border border-black rounded-lg"
                    onClick={onClick}
                >
                    Continue
                </button>
            </div>
        </div>
    ) : (
        loading && <FullScreenSpinner />
    );
};

export default GameComplete;
