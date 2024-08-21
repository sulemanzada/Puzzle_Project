import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../utils/axiosInstance.js";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Container from "./Container.jsx";
import SubmitButton from "../signinup/SubmitButton.jsx";
import {
    cookieExpired,
    signInOrUpdateUserSuccess,
} from "../../redux/userSlice.js";

const AddSecurityQs = ({ currentUserId, close }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        securityQs: "childhoodFriend",
        answer: "",
    });
    const [passwordView, setPasswordView] = useState("password");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePasswordViewChange = () => {
        passwordView === "text"
            ? setPasswordView("password")
            : setPasswordView("text");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const { data } = await axios.post(
                "/api/auth/add-security-question/" + currentUserId,
                formData,
                {
                    withCredentials: true,
                }
            );

            setSuccess(true);
            dispatch(signInOrUpdateUserSuccess(data.user));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
            if (error.response.data.message === "Unauthorised")
                dispatch(cookieExpired());
        }
    };

    return (
        <Container width={"max-w-[80%]"}>
            <IoMdCloseCircleOutline
                hidden={loading}
                onClick={close}
                className="ml-auto text-red-600 text-2xl cursor-pointer"
            />
            <article className="text-lg mb-5">
                Add a security question as an alternative way to login.
                <br />
                <span className="font-semibold">
                    (Note: Security question cannot be updated or viewed after
                    setting it. Answer is case sensitive.)
                </span>
            </article>

            <form
                onSubmit={onSubmit}
                className="flex items-left w-full flex-col gap-5"
            >
                <span className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">Question</p>
                    <select
                        disabled={loading || success}
                        value={formData.securityQs}
                        className="p-3 border border-black rounded-lg text-black w-full truncate"
                        onChange={handleChange}
                        id="securityQs"
                    >
                        <option
                            value="childhoodFriend"
                            className="overflow-hidden"
                        >
                            Name of childhood friend?
                        </option>
                        <option value="favBook">Favorite book?</option>
                        <option value="favMovie">Favorite movie?</option>
                        <option value="favFood">Favorite food?</option>
                        <option value="favAct">Favorite actor/actress?</option>
                    </select>
                </span>
                <div className={"flex flex-col gap-1"}>
                    <span className="flex gap-2 items-center">
                        <label
                            htmlFor="answer"
                            className="text-lg font-semibold"
                        >
                            Answer
                        </label>
                        {passwordView === "password" ? (
                            <FaEyeSlash
                                onClick={handlePasswordViewChange}
                                className="text-2xl cursor-pointer"
                            />
                        ) : (
                            <FaEye
                                onClick={handlePasswordViewChange}
                                className="text-2xl cursor-pointer"
                            />
                        )}
                    </span>
                    <input
                        disabled={loading || success}
                        value={formData.answer}
                        id="answer"
                        type={passwordView}
                        onChange={handleChange}
                        placeholder="answer"
                        className="w-full border border-black p-3 rounded-lg"
                    />
                    {error && error.includes("Answer") && (
                        <p className="text-red-600 text-lg">{error}</p>
                    )}
                </div>

                {!success ? (
                    <SubmitButton
                        loading={loading}
                        text={"Submit"}
                        error={error}
                    />
                ) : (
                    <p className="text-green-600 text-lg font-semibold">
                        Security question added successfully.
                    </p>
                )}
            </form>
        </Container>
    );
};

export default AddSecurityQs;
