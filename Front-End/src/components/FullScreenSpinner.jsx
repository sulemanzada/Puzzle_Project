import Spinner from "./Spinner";

const FullScreenSpinner = () => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-20 bg-black flex items-center justify-center overflow-hidden z-50">
            <Spinner size={"text-5xl"} />
        </div>
    );
};
export default FullScreenSpinner;
