import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    PrivateProfileRoute,
    PrivateSignInUpRoute,
} from "./utils/PrivateRoutes";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import History from "./pages/History";
import ShowCompletedGame from "./pages/ShowCompletedGame";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<PrivateSignInUpRoute />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>

                <Route element={<PrivateProfileRoute />}>
                    <Route path="/:user/history" element={<History />} />
                    <Route
                        path="/:user/history/game/:id"
                        element={<ShowCompletedGame />}
                    />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
