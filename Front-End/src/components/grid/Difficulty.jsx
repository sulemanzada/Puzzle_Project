import { useSelector, useDispatch } from "react-redux";
import { setDifficulty } from "../../redux/sudokuSlice";

const Button = (props) => {
    const { difficulty, isPlaying } = useSelector((state) => state.sudoku);
    const difficultyWithCapital =
        difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1);
    const bgColor =
        difficultyWithCapital === props.text ? "bg-blue-500" : "bg-white";

    return (
        <button
            disabled={isPlaying}
            onClick={props.onClick}
            className={`disabled:opacity-60 text-center w-[30%] text-black ${bgColor} border border-black rounded-lg p-3 font-bold`}
        >
            {props.text}
        </button>
    );
};

const Difficulty = () => {
    const dispatch = useDispatch();

    const buttons = [
        {
            onClick: () => dispatch(setDifficulty("easy")),
            text: "Easy",
        },
        {
            onClick: () => dispatch(setDifficulty("medium")),
            text: "Medium",
        },
        {
            onClick: () => dispatch(setDifficulty("hard")),
            text: "Hard",
        },
    ];

    return (
        <div className="flex gap-2 items-center justify-between mb-2 sm:mt-8">
            <p className="text-xl text-white">Difficulty: </p>

            {buttons.map(({ text, onClick }) => (
                <Button key={text} onClick={onClick} text={text} />
            ))}
        </div>
    );
};

export default Difficulty;
