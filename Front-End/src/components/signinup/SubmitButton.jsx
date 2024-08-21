import Spinner from "../Spinner";

const SubmitButton = ({ loading, text, error }) => {
    return (
        <>
            {error && error.includes("All") && (
                <p className="text-red-500">{error}</p>
            )}
            <button
                disabled={loading}
                className="disabled:opacity-60 flex justify-center items-center w-full rounded-lg bg-blue-500 border border-black text-white text-2xl p-3 mt-3"
            >
                {loading ? <Spinner size="text-2xl" /> : text}
            </button>
        </>
    );
};

export default SubmitButton;
