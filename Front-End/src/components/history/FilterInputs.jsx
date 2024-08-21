import { useDispatch, useSelector } from "react-redux";
import { GrAscend, GrDescend } from "react-icons/gr";
import {
    setFrom,
    setTo,
    setTimeTaken,
    setSort,
    setOrder,
} from "../../redux/filterSlice";

const FilterInputs = () => {
    const dispatch = useDispatch();
    const { from, to, timeTaken, sort, order } = useSelector(
        (state) => state.filter
    );

    return (
        <div className="flex gap-2 flex-wrap">
            <span className="flex gap-2 justify-center items-center">
                <p className="text-lg text-white">From:</p>
                <input
                    type="date"
                    value={from}
                    className="p-3 rounded-lg border border-black"
                    onChange={(e) => dispatch(setFrom(e.target.value))}
                />
            </span>
            <span className="flex gap-2 justify-center items-center">
                <p className="text-lg text-white">To:</p>
                <input
                    type="date"
                    value={to}
                    className="p-3 rounded-lg border border-black"
                    onChange={(e) => dispatch(setTo(e.target.value))}
                />
            </span>
            <span className="flex gap-2 justify-center items-center">
                <p className="text-lg text-white">
                    Longest time taken (in seconds):
                </p>
                <input
                    type="number"
                    value={timeTaken}
                    className="p-3 rounded-lg border border-black"
                    onChange={(e) => dispatch(setTimeTaken(e.target.value))}
                />
            </span>
            <span className="flex gap-1 text-lg text-white justify-center items-center">
                Sort by:
                <select
                    value={sort}
                    onChange={(e) => dispatch(setSort(e.target.value))}
                    className="p-3 border border-black rounded-lg text-black"
                >
                    <option value="completedAt">Completed On</option>
                    <option value="timeTaken">Time Taken</option>
                </select>
            </span>
            <span className="flex text-white gap-1 text-lg justify-center items-center">
                Order:
                {order === 1 ? (
                    <GrAscend
                        onClick={() => dispatch(setOrder(-1))}
                        className="cursor-pointer hover:border border-black"
                    />
                ) : (
                    <GrDescend
                        onClick={() => dispatch(setOrder(1))}
                        className="cursor-pointer hover:border border-black"
                    />
                )}
            </span>
        </div>
    );
};
export default FilterInputs;
