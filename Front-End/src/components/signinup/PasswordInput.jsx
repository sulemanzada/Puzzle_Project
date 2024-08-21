import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ loading, handleChange, password, error }) => {
    const [passwordView, setPasswordView] = useState("password");

    const handlePasswordViewChange = () => {
        passwordView === "text"
            ? setPasswordView("password")
            : setPasswordView("text");
    };

    return (
        <div className={"flex flex-col gap-1"}>
            <span className="flex gap-2 items-center">
                <label htmlFor="password" className="text-lg font-semibold">
                    Password
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
                value={password}
                id="password"
                type={passwordView}
                onChange={handleChange}
                placeholder="password"
                className="w-full border border-black p-3 rounded-lg"
            />
            {error &&
                (error.includes("password") || error.includes("Password")) && (
                    <p className="text-red-500">{error}</p>
                )}
        </div>
    );
};
export default PasswordInput;
