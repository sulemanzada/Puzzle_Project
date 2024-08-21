import { FaFilter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    resetFilters,
    setDifficulties,
    setMistakesMade,
} from "../../redux/filterSlice";
import FilterDropdown from "./FilterDropdowns";
import FilterInputs from "./FilterInputs";

const Filter = ({ onSubmit, disabled }) => {
    const dispatch = useDispatch();
    const { difficulties, mistakesMade } = useSelector((state) => state.filter);

    return (
        <form
            onSubmit={onSubmit}
            className="mr-auto ml-[10%] my-5 w-[80%] p-3 bg-blue-400 rounded-lg border border-black shadow-sm"
        >
            <span className="flex w-fit gap-1 text-xl items-center text-white">
                <FaFilter />
                <h1>Filter</h1>
            </span>
            <div className="mt-2">
                <FilterInputs />
                <div className="flex flex-wrap gap-2">
                    <FilterDropdown
                        section={"Difficulty"}
                        options={["Easy", "Medium", "Hard"]}
                        handleOnChange={(e) =>
                            dispatch(setDifficulties(e.target.id))
                        }
                        state={difficulties}
                    />
                    <FilterDropdown
                        section={"Mistakes Made"}
                        options={[0, 1, 2]}
                        handleOnChange={(e) =>
                            dispatch(setMistakesMade(Number(e.target.id)))
                        }
                        state={mistakesMade}
                    />
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    disabled={disabled}
                    className="disabled:bg-blue-300 bg-blue-500 hover:bg-blue-400 text-white text-lg rounded-lg border border-black p-3"
                >
                    Apply Filters
                </button>
                <button
                    type="button"
                    onClick={() => dispatch(resetFilters())}
                    disabled={disabled}
                    className="disabled:bg-red-300 bg-red-500 hover:bg-red-400 text-white text-lg rounded-lg border border-black p-3"
                >
                    Reset Filters
                </button>
            </div>
        </form>
    );
};

export default Filter;
