import { ImSpinner9 } from "react-icons/im";

const Spinner = ({ size, color }) => {
    const styles = {
        animation: "spin 1s infinite",
    };

    return (
        <ImSpinner9
            style={styles}
            className={`${size} ${color ?? "text-white"}`}
        />
    );
};

export default Spinner;
