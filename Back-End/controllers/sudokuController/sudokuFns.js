export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + (i % 3);

        if (
            board[row][i] === num ||
            board[i][col] === num ||
            board[m][n] === num
        ) {
            return false;
        }
    }
    return true;
}

export function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (!board[row][col]) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        } else {
                            board[row][col] = "";
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

export function removeCells(board, difficulty) {
    const difficultyLevel = {
        easy: 0.5,
        medium: 0.6,
        hard: 0.7,
    };

    const partialBoard = board.map((arr) => arr.slice(0));

    const cellsToRemove = Math.floor(81 * difficultyLevel[difficulty]);
    const cellIndices = Array.from({ length: 81 }, (_, i) => i);
    const shuffledIndices = shuffleArray(cellIndices);

    for (let i = 0; i < cellsToRemove; i++) {
        const index = shuffledIndices[i];
        const row = Math.floor(index / 9);
        const col = index % 9;
        partialBoard[row][col] = "";
    }

    return partialBoard;
}
