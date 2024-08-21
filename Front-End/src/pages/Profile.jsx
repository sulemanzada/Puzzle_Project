import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axiosInstance";
import Input from "../components/signinup/Input";
import PasswordInput from "../components/signinup/PasswordInput";
import SubmitButton from "../components/signinup/SubmitButton";
import UserGameStats from "../components/UserGameStatsDisplay";
import DeleteAccount from "../components/modals/DeleteAccount.jsx";
import {
    signInOrUpdateUserSuccess,
    deleteOrSignOutUser,
    cookieExpired,
} from "../redux/userSlice";
import AddSecurityQs from "../components/modals/AddSecurityQs.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [willDelete, setWillDelete] = useState(false);
    const [showAddSecurityQs, setShowAddSecurityQs] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const { data } = await axios.put(
                "/api/auth/update/" + currentUser._id,
                formData,
                { withCredentials: true }
            );
            setLoading(false);
            setSuccess(true);
            setError(null);
            setFormData({
                username: data.user.username,
                password: "",
            });
            dispatch(signInOrUpdateUserSuccess(data.user));
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    const signOut = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.get("/api/auth/sign-out/" + currentUser._id, {
                withCredentials: true,
            });
            dispatch(deleteOrSignOutUser());
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    const deleteUser = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete("/api/auth/delete/" + currentUser._id, {
                withCredentials: true,
            });
            dispatch(deleteOrSignOutUser());
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    return (
        <>
            <div className="flex flex-col gap-11 min-h-screen my-5 w-full items-center justify-center">
                <h1 className="text-white text-4xl">
                    {currentUser.username + "'s Profile"}
                </h1>
                <div className="flex flex-col md:flex-row justify-between gap-2 p-3 w-4/5 bg-white rounded-lg mx-auto">
                    <form
                        onSubmit={handleOnSubmit}
                        className="md:w-1/2 p-3 flex flex-col gap-5"
                    >
                        <Input
                            id="username"
                            text={"Username"}
                            loading={loading}
                            value={formData.username}
                            type={"text"}
                            handleChange={handleChange}
                            error={error}
                            errorType={"Username"}
                        />
                        <PasswordInput
                            loading={loading}
                            handleChange={handleChange}
                            password={formData.password}
                            error={error}
                        />
                        <SubmitButton
                            loading={loading}
                            text={"Update"}
                            error={error}
                        />
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={signOut}
                                className="text-red-600 hover:underline"
                                disabled={loading}
                            >
                                Sign-out
                            </button>
                            <button
                                type="button"
                                onClick={() => setWillDelete(true)}
                                className="text-red-600 hover:underline"
                                disabled={loading}
                            >
                                Delete Account
                            </button>
                        </div>

                        {!currentUser.hasSecurityQs ? (
                            <button
                                type="button"
                                className="text-left text-red-600 hover:underline w-fit"
                                onClick={() => setShowAddSecurityQs(true)}
                            >
                                If you forget your password
                            </button>
                        ) : (
                            <p className="text-green-600 font-semibold">
                                Security question added.
                            </p>
                        )}

                        {success && (
                            <p className="text-green-600 text-lg font-semibold">
                                User updated Successfully!
                            </p>
                        )}
                    </form>
                    <UserGameStats />
                </div>
            </div>
            {willDelete && (
                <DeleteAccount
                    yes={deleteUser}
                    no={() => setWillDelete(false)}
                    disabled={loading}
                />
            )}
            {showAddSecurityQs && (
                <AddSecurityQs
                    currentUserId={currentUser._id}
                    close={() => setShowAddSecurityQs(false)}
                />
            )}
        </>
    );
};

export default Profile;
