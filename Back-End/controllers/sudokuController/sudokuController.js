import { shuffleArray, solve, removeCells } from "./sudokuFns.js";

let board = null;

export const generateGame = (req, res, next) => {
    try {
        board = Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => "")
        );
        const firstRow = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (let i = 0; i < 9; i++) {
            board[0][i] = firstRow[i];
        }

        solve(board);
        const partialBoard = removeCells(board, req.body.difficulty);
        res.status(200).json({ success: true, partialBoard });
    } catch (error) {
        next(error);
    }
};

export const validateNumber = (req, res, next) => {
    try {
        const { value, row, column } = req.body;

        if (board[row][column] === value) {
            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false });
        }
    } catch (error) {
        next(error);
    }
};

export const resetGame = (req, res, next) => {
    try {
        board = Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => "")
        );
        res.status(200).json({ success: true, board });
    } catch (error) {
        next(error);
    }
};
