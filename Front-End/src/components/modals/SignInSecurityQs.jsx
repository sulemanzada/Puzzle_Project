import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../utils/axiosInstance.js";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Container from "./Container.jsx";
import Input from "../signinup/Input.jsx";
import SubmitButton from "../signinup/SubmitButton.jsx";
import { signInOrUpdateUserSuccess } from "../../redux/userSlice.js";

const SignInSecurityQs = ({ close }) => {
    const initialFormData = {
        username: "",
        question: "childhoodFriend",
        answer: "",
    };
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialFormData);
    const [passwordView, setPasswordView] = useState("password");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePasswordViewChange = () => {
        passwordView === "text"
            ? setPasswordView("password")
            : setPasswordView("text");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                "/api/auth/security-qs-sign-in",
                formData,
                {
                    withCredentials: true,
                }
            );
            setLoading(false);
            setError(null);
            setFormData(initialFormData);
            dispatch(signInOrUpdateUserSuccess(data.user));
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <Container width={"min-w-[60%]"}>
            <IoMdCloseCircleOutline
                hidden={loading}
                onClick={close}
                className="ml-auto text-red-600 text-2xl cursor-pointer"
            />
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
            >
                <Input
                    id="username"
                    text={"Username"}
                    loading={loading}
                    value={formData.username}
                    type={"text"}
                    handleChange={handleChange}
                    error={error}
                    errorType={"User"}
                />
                <span className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">Security question</p>
                    <select
                        disabled={loading}
                        value={formData.question}
                        className="p-3 border border-black rounded-lg text-black w-full truncate"
                        onChange={handleChange}
                        id="question"
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
                        disabled={loading}
                        value={formData.answer}
                        id="answer"
                        type={passwordView}
                        onChange={handleChange}
                        placeholder="answer"
                        className="w-full border border-black p-3 rounded-lg"
                    />
                    {error && error.includes("Invalid") && (
                        <p className="text-red-600 text-lg">{error}</p>
                    )}
                </div>
                <SubmitButton
                    loading={loading}
                    text={"Sign In"}
                    error={error}
                />
            </form>
        </Container>
    );
};
export default SignInSecurityQs;
