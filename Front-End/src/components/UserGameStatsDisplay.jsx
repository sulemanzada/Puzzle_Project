import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axiosInstance";
import FullScreenSpinner from "./FullScreenSpinner";
import { cookieExpired } from "../redux/userSlice.js";

const UserGameStats = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [userGameStats, setUserGameStats] = useState({});
    const [loading, setLoading] = useState(true);
    const headerStyle = "text-md font-semibold";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(
                    "/api/user/" + currentUser._id,
                    { withCredentials: true }
                );
                setUserGameStats(data.stats);
                setLoading(false);
            } catch (error) {
                console.log(error.response.data.message);
                if (error.response.data.message === "Unauthorised")
                    dispatch(cookieExpired());
            }
        };

        fetchUserData();
    }, [currentUser._id]);

    const timeFormat = (time) => {
        const hrs = Math.floor(time / 3600);
        const mins = Math.floor(time / 60) % 60;
        const seconds = time % 60;

        return `${hrs} hour(s), ${mins} minute(s) and ${seconds} second(s)`;
    };

    const gameTypeFormat = (object, difficulty) => {
        const lcDifficulty = difficulty.toLowerCase();
        const anOrA = difficulty === "Easy" ? "an" : "a";

        return (
            <div className="my-2">
                <p>
                    <span className={headerStyle}>
                        {difficulty} games played:
                    </span>{" "}
                    {object.played}
                </p>
                <p>
                    <span className={headerStyle}>
                        Mistakes made during {lcDifficulty} games:
                    </span>{" "}
                    {object.mistakes}
                </p>
                <p>
                    <span className={headerStyle}>
                        Shortest time spent clearing {anOrA} {lcDifficulty}{" "}
                        game:
                    </span>{" "}
                    {object.shortestTime
                        ? timeFormat(object.shortestTime)
                        : "null"}
                </p>
                <p>
                    <span className={headerStyle}>
                        Longest time spent clearing {anOrA} {lcDifficulty} game:
                    </span>{" "}
                    {object.longestTime
                        ? timeFormat(object.longestTime)
                        : "null"}
                </p>
            </div>
        );
    };

    return loading ? (
        <FullScreenSpinner />
    ) : (
        <div className="flex flex-col gap-2 md:w-1/2 p-3">
            <p>
                <span className={headerStyle}>Username:</span>{" "}
                {currentUser.username}
            </p>
            <i className="my-2">
                The following stats were only tallied for games that were
                completed
            </i>
            <p>
                <span className={headerStyle}>Completed first game at:</span>{" "}
                {userGameStats.firstGame
                    ? new Date(userGameStats.firstGame).toLocaleDateString()
                    : "null"}
            </p>
            <p>
                <span className={headerStyle}>Games played:</span>{" "}
                {userGameStats.gamesPlayed}
            </p>
            <p>
                <span className={headerStyle}>Time spent playing:</span>{" "}
                {timeFormat(userGameStats.totalTime)}
            </p>
            <p>
                <span className={headerStyle}>Mistakes made:</span>{" "}
                {userGameStats.totalMistakes}
            </p>

            {gameTypeFormat(userGameStats.easyGames, "Easy")}
            {gameTypeFormat(userGameStats.mediumGames, "Medium")}
            {gameTypeFormat(userGameStats.hardGames, "Hard")}
        </div>
    );
};

export default UserGameStats;
