import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import CountrySelection from "../pages/CountrySelection";
import LeagueSelection from "../pages/LeagueSelection";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/country",
        element: <CountrySelection />,
    },
    {
        path: "/leagues",
        element: <LeagueSelection />,
    }
]);

export default router;