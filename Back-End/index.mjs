import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import sudokoRouter from "./routes/sudokuRoute.js";
import userRouter from "./routes/userRoute.js";
import config from "./config.json" assert { type: "json" };

dotenv.config();

const app = express();

const corsOptions = config[process.env.NODE_ENV].cors;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json("server is running");
});

app.use("/api/sudoku/", sudokoRouter);

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to db");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.log(err.message));

export default app;
