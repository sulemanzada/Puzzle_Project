import { BsTriangleFill } from "react-icons/bs";

const PauseScreen = (props) => {
    return (
        <div
            onClick={props.onClick}
            className="cursor-pointer flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 z-10 bg-white"
        >
            <div className="bg-blue-500 border border-black rounded-full h-[100px] w-[100px] flex items-center justify-center">
                <BsTriangleFill className="text-white text-5xl rotate-90 ml-2" />
            </div>
        </div>
    );
};

export default PauseScreen;
