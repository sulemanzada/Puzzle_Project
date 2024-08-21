import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsPaused } from "../../redux/sudokuSlice";

const Buttons = (props) => {
    const dispatch = useDispatch();
    const { isPlaying, isPaused } = useSelector((state) => state.sudoku);
    const pauseButtonBgColor = isPaused ? "bg-blue-500" : "bg-white";
    const className =
        "disabled:opacity-60 w-full bg-white border border-black rounded-lg text-black p-3 font-bold";

    return (
        <>
            <button
                onClick={() => dispatch(setIsPaused())}
                className={`w-full ${pauseButtonBgColor} border border-black rounded-lg text-black p-3 font-bold`}
                disabled={!isPlaying}
            >
                Pause
            </button>
            <button
                onClick={props.generateGame}
                className={className}
                disabled={isPlaying}
            >
                New Game
            </button>
            <button
                onClick={props.resetGame}
                className={className}
                disabled={!isPlaying}
            >
                Reset
            </button>
        </>
    );
};
export default Buttons;
