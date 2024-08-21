import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axiosInstance";
import FullScreenSpinner from "../components/FullScreenSpinner";
import Spinner from "../components/Spinner";
import GameDataDisplay from "../components/history/GameDataDisplay";
import Filter from "../components/history/Filter";
import { resetFilters } from "../redux/filterSlice";
import { cookieExpired } from "../redux/userSlice.js";

const History = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const filterData = useSelector((state) => state.filter);
    const [currentFilters, setCurrentFilters] = useState({});

    const [userGameData, setUserGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetchGameData(filterData);

        return () => dispatch(resetFilters());
    }, []);

    const fetchGameData = async (filters) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                "/api/user/history/" + currentUser._id + "?limit=9",
                filters,
                { withCredentials: true }
            );

            setUserGameData(data.gameData);
            setLoading(false);
            setCurrentFilters(filterData);

            if (data.gameData.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    const getMore = async () => {
        setShowMoreLoading(true);
        try {
            const { data } = await axios.post(
                "/api/user/history/" +
                    currentUser._id +
                    "?limit=9&startIndex=" +
                    userGameData.length,
                currentFilters,
                { withCredentials: true }
            );

            setUserGameData([...userGameData, ...data.gameData]);
            setShowMoreLoading(false);
            if (data.gameData.length < 9) setShowMore(false);
        } catch (error) {
            console.log(error.respone.data.message);
            setShowMoreLoading(false);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetchGameData(filterData);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-3 mx-auto">
            <h1 className="text-white text-4xl my-3">{`${currentUser.username}'s Game History`}</h1>
            {loading ? (
                <FullScreenSpinner />
            ) : (
                <>
                    <Filter onSubmit={onSubmit} disabled={loading} />
                    <div className="flex flex-col w-full items-center justify-center gap-3 p-3">
                        {userGameData.map((data) => (
                            <GameDataDisplay key={data._id} gameData={data} />
                        ))}
                    </div>
                </>
            )}

            {!userGameData ||
                (userGameData.length < 1 && (
                    <p className="text-white text-xl">No results</p>
                ))}

            {userGameData && showMoreLoading ? (
                <Spinner />
            ) : showMore ? (
                <p
                    className="text-white hover:underline text-xl cursor-pointer mb-3"
                    onClick={getMore}
                >
                    Show more
                </p>
            ) : (
                userGameData.length > 0 && (
                    <p className="text-white text-xl cursor-pointer mb-3">
                        {"You've reached the end!"}
                    </p>
                )
            )}
        </div>
    );
};

export default History;
