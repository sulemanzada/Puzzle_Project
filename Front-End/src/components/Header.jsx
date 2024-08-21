import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className="bg-blue-900 shadow-md">
            <div className="max-w-[80%] flex items-center justify-between mx-auto text-white p-4 text-xl">
                <Link to={"/"}>Play Sudoku</Link>
                <div className="flex gap-3">
                    {currentUser ? (
                        <>
                            <Link to={`/${currentUser.username}/history`}>
                                History
                            </Link>
                            <Link to={"/profile"}>Profile</Link>
                        </>
                    ) : (
                        <Link to={"/sign-in"}>Sign-In</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
