import { useSelector } from "react-redux";

const GameOver = ({ onClick }) => {
    const { gameOver } = useSelector((state) => state.sudoku);

    return (
        gameOver && (
            <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 w-full h-full flex items-center justify-center">
                <div className="bg-white rounded-lg border border-black max-w-[80%] p-5 text-xl">
                    Game Over!
                    <br />
                    <br />
                    Better luck next time.
                    <br />
                    <br />
                    <button
                        className="w-full bg-red-500 p-3 text-white font-bold text-xl border border-black rounded-lg"
                        onClick={onClick}
                    >
                        Continue
                    </button>
                </div>
            </div>
        )
    );
};

export default GameOver;
