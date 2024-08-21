import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementTime } from "../../redux/sudokuSlice";

const Timer = () => {
    const dispatch = useDispatch();
    const { isPlaying, time, isPaused } = useSelector((state) => state.sudoku);

    const mins =
        time < 600 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
    const seconds = time % 60;
    const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

    useEffect(() => {
        if (isPlaying && !isPaused) {
            const interval = setInterval(() => {
                dispatch(incrementTime());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, time, isPaused]);

    return <span>{mins + ":" + secondsFormatted}</span>;
};

export default Timer;
