import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const FilterDropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const title =
        props.state.length > 0 ? props.state.join(", ") : props.section;

    return (
        <div className="mt-2">
            <span
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg flex p-3 items-center justify-between text-black bg-white gap-4 rounded-lg border border-black cursor-pointer"
            >
                <span className="flex gap-1">{title}</span>
                <FaArrowDown
                    className="transition-transform duration-500"
                    style={isOpen && { transform: "rotate(180deg)" }}
                />
            </span>
            <div
                className={`filter-dropdown ${
                    isOpen && "is-open border border-black"
                }  bg-white rounded-lg mt-2`}
            >
                <div className="overflow-hidden ml-2">
                    {props.options.map((option) => (
                        <span
                            key={option}
                            className="flex gap-2 items-center text-md"
                        >
                            <input
                                className="cursor-pointer w-5 h-5 m-1"
                                type="checkbox"
                                id={option}
                                onChange={(e) => props.handleOnChange(e)}
                                checked={props.state.includes(option)}
                            />
                            <label className="cursor-pointer" htmlFor={option}>
                                {option}
                            </label>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;
