const Input = (props) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.id} className="text-lg font-semibold">
                {props.text}
            </label>
            <input
                disabled={props.loading}
                id={props.id}
                value={props.value}
                type={props.type}
                onChange={props.handleChange}
                placeholder={props.text.toLowerCase()}
                className="w-full border border-black p-3 rounded-lg"
            />
            {props.error && props.error.includes(props.errorType) && (
                <p className="text-red-500">{props.error}</p>
            )}
        </div>
    );
};
export default Input;
