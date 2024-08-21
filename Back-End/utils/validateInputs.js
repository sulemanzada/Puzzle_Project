import { errorHandler } from "./errorHandler.js";

export const validateInputs = async (req, res, doesUserExist) => {
    const { username, password } = req.body;

    if (doesUserExist && doesUserExist._doc.username === username)
        throw errorHandler(409, "Username already exists");

    if (username.length < 4 || username.length > 12)
        throw errorHandler(
            409,
            "Username must be between 4 and 12 characters in length"
        );

    if (/[^0-9A-Za-z]/gi.test(username))
        throw errorHandler(
            409,
            "Username may not contain any special characters"
        );

    if (
        (password && password.length < 4) ||
        (password && password.length > 20) ||
        (password && password.includes(" "))
    )
        throw errorHandler(
            409,
            "Password must be between 4 and 20 characters in length and cannot contain spaces"
        );
};
