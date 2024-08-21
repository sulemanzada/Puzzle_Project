import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axiosInstance";
import GridCell from "./GridCell";
import Timer from "./Timer";
import Difficulty from "./Difficulty";
import Buttons from "./Buttons";
import Spinner from "../Spinner";
import PauseScreen from "./PauseScreen";
import GameComplete from "./GameComplete";
import GameOver from "./GameOver";
import {
    reset,
    setGameOver,
    setIsPaused,
    setIsPlaying,
} from "../../redux/sudokuSlice";

const Grid = () => {
    const dispatch = useDispatch();
    const { difficulty, isPlaying, isPaused } = useSelector(
        (state) => state.sudoku
    );

    const [gridMatrix, setGridMatrix] = useState(
        Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""))
    );
    const gridColorsInitial = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => "bg-white")
    );
    const [gridColors, setGridColors] = useState(gridColorsInitial);
    const [mistakes, setMistakes] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => dispatch(reset());
    }, []);

    async function generateGame() {
        setLoading(true);
        setGridColors(gridColorsInitial);
        try {
            const { data } = await axios.post("/api/sudoku/generate-game", {
                difficulty,
            });
            setGridMatrix(data.partialBoard);
            dispatch(setIsPlaying());
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
        }
    }

    async function resetGame() {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/sudoku/reset-game");
            setGridMatrix(data.board);
            setGridColors(gridColorsInitial);
            setMistakes(0);
            dispatch(reset());
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
        }
    }

    function handleOnCellFocus(row, column) {
        setGridColors(gridColorsInitial);
        const gridColorsCopy = gridColorsInitial.map((arr) => arr.slice(0));

        for (let i = 0; i < 9; i++) {
            const regionRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const regionCol = 3 * Math.floor(column / 3) + (i % 3);
            gridColorsCopy[regionRow][regionCol] = "bg-blue-200";
        }

        for (let i = 0; i < 9; i++) {
            gridColorsCopy[row][i] = "bg-blue-400";
            gridColorsCopy[i][column] = "bg-blue-400";
        }

        gridColorsCopy[row][column] = "bg-blue-700";

        setGridColors(gridColorsCopy);
    }

    async function isInputValid(value, row, column) {
        try {
            const { data } = await axios.post("/api/sudoku/validate-number", {
                value,
                row,
                column,
            });
            return data.success;
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    async function handleValueChange(e, row, column) {
        const inputValue = Number(e.target.value);
        const isValid = await isInputValid(inputValue, row, column);

        if (!isValid) {
            const gridColorsCopy = gridColors.map((arr) => arr.slice(0));
            gridColorsCopy[row][column] = "bg-red-700";
            setGridColors(gridColorsCopy);

            const mistakesValue = mistakes + 1;
            setMistakes(mistakesValue);

            if (mistakesValue === 3) return dispatch(setGameOver());

            return;
        }

        const gridMatrixCopy = gridMatrix.map((arr) => arr.slice(0));
        const gridColorsCopy = gridColors.map((arr) => arr.slice(0));
        gridMatrixCopy[row][column] = inputValue;
        gridColorsCopy[row][column] = "bg-green-700";
        setGridMatrix(gridMatrixCopy);
        setGridColors(gridColorsCopy);
    }

    function generateRegionBorder(row, column) {
        if (column % 3 === 2 && row % 3 === 2) {
            return "border-r-slate-700 border-b-slate-700";
        } else if (column % 3 === 2) {
            return "border-r-slate-700";
        } else if (row % 3 === 2) {
            return "border-b-slate-700";
        }
    }

    const gridDisplay = [];

    for (let row = 0; row < 9; row++) {
        const displayRow = [];

        for (let column = 0; column < 9; column++) {
            displayRow.push(
                <GridCell
                    key={column}
                    value={gridMatrix[row][column]}
                    bg={gridColors[row][column]}
                    border={generateRegionBorder(row, column)}
                    onFocus={() => handleOnCellFocus(row, column)}
                    onChange={(e) => handleValueChange(e, row, column)}
                    disabled={gridMatrix[row][column] || !isPlaying}
                />
            );
        }

        gridDisplay.push(displayRow);
    }

    return (
        <>
            <div className="flex flex-col justify-center max-w-[80%] md:flex-row mx-auto my-5 gap-3 p-5">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xl text-white">
                        <p className="w-1/3">
                            {difficulty.slice(0, 1).toUpperCase() +
                                difficulty.slice(1)}{" "}
                            Mode
                        </p>
                        <p className="w-1/3 text-center">
                            Mistakes:{" "}
                            <span className="text-red-600 font-semibold">
                                {mistakes}/3
                            </span>
                        </p>
                        <span className="w-1/3 text-right">
                            <Timer />
                        </span>
                    </div>
                    <div className="flex flex-wrap border border-black w-full md:max-w-[450px] md:min-w-[400px] relative">
                        {loading && (
                            <div className="cursor-pointer flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 z-10 bg-white">
                                <Spinner
                                    size={"text-4xl"}
                                    color={"text-blue-500"}
                                />
                            </div>
                        )}
                        {gridDisplay}
                        {isPaused && (
                            <PauseScreen
                                onClick={() => dispatch(setIsPaused())}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Difficulty />
                    <Buttons
                        generateGame={generateGame}
                        resetGame={resetGame}
                    />
                </div>
            </div>
            <GameComplete
                board={gridMatrix}
                onClick={resetGame}
                mistakes={mistakes}
            />
            <GameOver onClick={resetGame} />
        </>
    );
};

export default Grid;
