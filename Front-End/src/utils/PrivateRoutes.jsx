import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateProfileRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export const PrivateSignInUpRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Navigate to={"/profile"} /> : <Outlet />;
};
