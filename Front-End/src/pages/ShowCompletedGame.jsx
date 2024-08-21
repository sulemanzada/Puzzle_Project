import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import GridCell from "../components/grid/GridCell";
import FullScreenSpinner from "../components/FullScreenSpinner";
import { cookieExpired } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";

const ShowCompletedGame = () => {
    const dispatch = useDispatch();
    const [gridMatrix, setGridMatrix] = useState([]);
    const [loading, setLoading] = useState(true);
    const gridDisplay = [];
    const params = useParams();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const { data } = await axios.get(
                    "/api/user/game/" + params.id,
                    { withCredentials: true }
                );
                setGridMatrix(data.gridMatrix.map((arr) => arr.slice(0)));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error.response.data.message);
                if (error.response.data.message === "Unauthorised")
                    dispatch(cookieExpired());
            }
        };

        fetchGame();
    }, []);

    function generateRegionBorder(row, column) {
        if (column % 3 === 2 && row % 3 === 2) {
            return "border-r-slate-700 border-b-slate-700";
        } else if (column % 3 === 2) {
            return "border-r-slate-700";
        } else if (row % 3 === 2) {
            return "border-b-slate-700";
        }
    }

    if (!loading) {
        for (let row = 0; row < 9; row++) {
            const displayRow = [];

            for (let column = 0; column < 9; column++) {
                displayRow.push(
                    <GridCell
                        key={column}
                        value={gridMatrix[row][column]}
                        border={generateRegionBorder(row, column)}
                        bg={"bg-white"}
                        disabled={true}
                    />
                );
            }

            gridDisplay.push(displayRow);
        }
    }

    return loading ? (
        <FullScreenSpinner />
    ) : (
        <div className="flex items-center justify-center h-screen w-[80%] mx-auto">
            <div className="flex flex-wrap border border-black w-full md:max-w-[450px] md:min-w-[400px] pointer-events-none">
                {gridDisplay}
            </div>
        </div>
    );
};
export default ShowCompletedGame;
