const GridCell = (props) => {
    const cursor = props.disabled ? "" : "cursor-pointer";

    function handleKeyDown(e) {
        if (e.key === "e" || e.key === "E" || e.key === "0") {
            e.preventDefault();
        }
    }

    function handleOnPaste(e) {
        const paste = e.clipboardData.getData("text");

        if (paste.includes("e") || paste.includes("E") || paste.includes("0")) {
            e.preventDefault();
        }
    }

    return (
        <input
            type="number"
            value={props.value}
            className={`${props.bg} border ${props.border} text-2xl text-center w-[11.1111111%] focus:outline-none caret-transparent ${cursor} h-[50px]`}
            onFocus={props.onFocus}
            onChange={props.onChange}
            disabled={props.disabled}
            onKeyDown={(e) => handleKeyDown(e)}
            onPaste={(e) => handleOnPaste(e)}
        />
    );
};

export default GridCell;
